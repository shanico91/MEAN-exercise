var express = require('express'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var routes = function (Form) {
  var newformRouter = express.Router();

  newformRouter.route('/')
    .post(function (req, res) {
      var form = new Form(req.body);

      if (!req.body.name) {
        res.status(400).send('name should be specified');
      }
      else {
        form.save();
        res.status(201).send(form);
      }

    });

  return newformRouter;
}

module.exports = routes;
