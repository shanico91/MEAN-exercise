var express = require('express'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var routes = function (Form, Type) {
  var submissionsRouter = express.Router();

  submissionsRouter.use('/:formId', function (req, res, next) {
    Form.findById(req.params.formId, function (err, form) {
      if (err)
        res.status(500).send(err);
      else if (form) {
        req.form = form;
        next();
      }
      else {
        res.status(404).send('no form found');
      }
    });
  });

  submissionsRouter.route('/:formId')
    .get(function (req, res) {

      Type.find(function (err, types) {
        if (err)
          res.status(500).send(err);
        else {
          var returnTypes = [];
          types.forEach(function (element, index, array) {
            if (element.type == req.form._id) {
              returnTypes.push(element.fields);
            }
          })
          res.json(returnTypes);
        }
      });

    });


  return submissionsRouter;
}

module.exports = routes;
