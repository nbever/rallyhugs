const mongoose = require('mongoose');

const buildDeleteRoutes = (app, model) => {

  app.delete('/api/tag/:objectId', async (req, res) => {
    const oid = req.params.objectId;

    await model.Tag.findOneAndDelete({_id: mongoose.Types.ObjectId(oid)});
    res.status(200).end();
  });

  app.delete('/api/user/:objectId', async (req, res) => {
    const oid = req.params.objectId;

    await model.User.findOneAndDelete({_id: mongoose.Types.ObjectId(oid)});
    res.status(200).end();
  });

  app.delete('/api/customer/:objectId', async (req, res) => {
    const oid = req.params.objectId;

    await model.Customer.findOneAndDelete({_id: mongoose.Types.ObjectId(oid)});
    res.status(200).end();
  });

  app.delete('/api/comment/:objectId', async (req, res) => {
    const oid = req.params.objectId;

    await model.Comment.findOneAndDelete({_id: mongoose.Types.ObjectId(oid)});
    res.status(200).end();
  });

};

module.exports = {buildDeleteRoutes};