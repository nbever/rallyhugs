const {isValidObjectId} = require('./utils');
const mongoose = require('mongoose');

const checkName = (req, res) => {

  if (!req.body.name) {
    res.status(400).send('Bad Request');
    return false;
  }

  return true;
};

const buildPostRoutes = (app, model) => {

  const {Tag, Customer, User} = model;

  app.post('/api/tag', async (req, res) => {

    if (!checkName(req,res)) {
      return;
    }
    
    const result = await Tag.updateOne({name: req.body.name}, req.body, {upsert: true});
    res.status(200).end();
  });

  app.post('/api/customer', async (req, res) => {
    
    if (!checkName(req,res)) {
      return;
    }

    const result = await Customer.updateOne({name: req.body.name}, req.body, {upsert: true});
    res.status(200).end();
  });

  app.post('/api/user', async (req, res) => {
    
    if (!checkName(req,res)) {
      return;
    }

    const result = await User.updateOne({name: req.body.name}, req.body, {upsert: true});
    res.status(200).end();
  });

  app.post('/api/comment', async (req, res) => {
    if (!req.body.comment) {
      res.status(400).send('Bad Request');
      return;
    }

    let customerId = req.body.customer;
    let customerName = req.body.customer;

    if (!isValidObjectId(customerId) && customerName) {
      const newCustomer = new model.Customer({name: customerName});
      const custResponse = await newCustomer.save();
      customerId = custResponse._id;
    }
    else {
      const existingCustomer = await model.Customer.findOne({_id: mongoose.Types.ObjectId(customerName)});
      customerName = existingCustomer.name;
    }

    const realTags = req.body.tags.split(',');

    // sequnetial processing desired.
    for (let i = 0; i < realTags.length; i++ ) {
      const tag = realTags[i];

      if (!tag) {
        continue;
      }

      await Tag.updateOne({name: tag}, {name: tag}, {upsert: true});
    }

    const realComment = {
      ...req.body,
      tags: realTags,
      customer: customerId,
      customerName: customerName
    };

    const comment = new model.Comment(realComment);
    await comment.save();
    res.status(200).end();
  })
};

module.exports = {buildPostRoutes};