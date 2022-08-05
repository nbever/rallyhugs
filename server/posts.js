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

  const createOrFind = async (anId, aName, aModel) => {
    let tempId = anId;
    let tempName = aName;

    if (!isValidObjectId(tempId) && tempName) {
      const newThing = await aModel.findOneAndUpdate({name: tempName}, {name: tempName}, {upsert: true});
      tempId = newThing._doc._id;
    }
    else {
      const existingThing = await aModel.findOne({_id: mongoose.Types.ObjectId(tempName)});
      tempName = existingThing.name;
      tempId = existingThing._id;
    }

    return {
      _id: tempId,
      name: tempName
    };
  };

  app.post('/api/comment', async (req, res) => {
    if (!req.body.comment) {
      res.status(400).send('Bad Request');
      return;
    }

    const customerDetails = await createOrFind(req.body.customer, req.body.customer, model.Customer);
    const {_id: customerId, name: customerName} = customerDetails;

    const userDetails = await createOrFind(req.body.user, req.body.user, model.User);
    const {_id: userId, name: userName} = userDetails;

    const realTags = req.body.tags.split(',');

    // sequnetial processing desired.
    for (let i = 0; i < realTags.length; i++ ) {
      const tag = realTags[i];

      if (!tag) {
        continue;
      }

      await Tag.updateOne({name: tag}, {name: tag.trim()}, {upsert: true});
    }

    const realComment = {
      ...req.body,
      user: userId,
      userName: userName,
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