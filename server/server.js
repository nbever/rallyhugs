const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const model = require('./schemas');
const posts = require('./posts');
const deletes = require('./deletes');

const app = express();
const port = 9999;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/rallyhugs');
};

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.get('/api/tags', async (req, res) => {
  const tags = await model.Tag.find({}).exec();
  res.send(tags);
});

app.get('/api/customers', async (req, res) => {
  const customers = await model.Customer.find({}).exec();
  res.send(customers);
});

app.get('/api/users', async (req, res) => {
  const users = await model.User.find({}).exec();
  res.send(users);
});

app.get('/api/comments', async (req, res) => {

  const {start, end, user} = req.query;
  const tags = req.query?.tags?.split(',');
  const customers = req.query?.customers?.split(',');
  const ratingMax = parseInt(req.query?.ratingMax);
  const ratingMin = parseInt(req.query?.ratingMin);

  const query = {};

  if (start && end) {
    query.date = { $gt: start, $lt: end };
  }

  if (customers) {
    query.customer = {$in: customers};
  }

  if (tags) {
    query.tags = {$in: tags};
  }

  if (ratingMax || ratingMin) {
    query.positive = {};

    if (ratingMax) {
      query.positive.$lt = ratingMax;
    }

    if (ratingMin) {
      query.positive.$gt = ratingMin;
    }
  }

  const comments = await model.Comment.find(query).exec();

  res.send(comments);

});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

posts.buildPostRoutes(app, model);
deletes.buildDeleteRoutes(app, model);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});