const {isValidObjectId} = require('./utils');

const checkName = (req, res) => {

  if (!req.body.name) {
    res.status(400).send('Bad Request');
    return false;
  }

  return true;
};

const buildPostRoutes = (app, model) => {

  app.post('/api/tag', async (req, res) => {

    if (!checkName(req,res)) {
      return;
    }
    
    const newTag = new model.Tag(req.body);
    const result = await newTag.save();
    res.status(200).end();
  });

  app.post('/api/customer', async (req, res) => {
    
    if (!checkName(req,res)) {
      return;
    }

    const newCustomer = new model.Customer(req.body);
    const result = await newCustomer.save();
    res.status(200).end();
  });

  app.post('/api/user', async (req, res) => {
    
    if (!checkName(req,res)) {
      return;
    }

    const newUser = new model.User(req.body);
    const result = await newUser.save();
    res.status(200).end();
  });

  app.post('/api/comment', async (req, res) => {
    if (!req.body.comment) {
      res.status(400).send('Bad Request');
      return;
    }

    let customerId = req.body.customer;

    if (!isValidObjectId(req.body.customer) && req.body.customer) {
      const newCustomer = new model.Customer({name: req.body.name});
      const custResponse = await newCustomer.save();
      customerId = custResponse._id;
    }

    const realTags = req.body.tags.split(',');
    const realComment = {
      ...req.body,
      tags: realTags,
      customer: customerId
    };

    const comment = new model.Comment(realComment);
    await comment.save();
    res.status(200).end();
  })
};

module.exports = {buildPostRoutes};