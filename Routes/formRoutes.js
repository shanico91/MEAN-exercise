var express = require('express'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var routes = function (Form, Type) {
  var formRouter = express.Router();

  formRouter.route('/')
    .get(function (req, res) {
      Form.find(function (err, forms) {
        if (err)
          res.status(500).send(err);
        else {
          /*var returnForms = [];
          forms.forEach(function (element, index, array) {
            var newForm = {};
            newForm.Id = element._id;
            newForm.name = element.name;
            newForm.number = element.number;

            returnForms.push(newForm);
          })
          res.json(returnForms);*/
          res.json(forms);
        }
      });
    });

  formRouter.use('/:formId', function (req, res, next) {
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

  formRouter.route('/:formId')

    .post(function (req, res) {

      var f = {};
      f.type = req.form._id;
      f.fields = req.body;

      var newType = new Type(f);

      newType.save();
      req.form.number = req.form.number + 1;
      req.form.save();
      res.status(201).send(newType);


    })
    .get(function (req, res) {
      var ans = req.form.fields;
      res.send(ans);
      /*var returnForm = req.form.toJSON();
      returnForm.links = {};
      var newLink = 'http://' + req.headers.host + '/api/forms/?genre=' + returnForm.genre;
      returnForm.links.FilterByThisGenre = newLink.replace(' ', '%20');
      res.json(returnForm);*/
      //res.send('should return the page with the form according to the form.fields');
      //should return the page with the form according to the form.fields
    });
  /*.put(function(req, res){
      req.form.title = req.body.title;
      req.form.author - req.body.author;
      req.form.genre = req.body.genre;
      req.form.read = req.body.read;
      req.form.save(function(err){
          if(err)
              res.status(500).send(err);
          else{
              res.json(req.form);
          }
      });
  })
  .patch(function(req, res){
      if(req.body._id)
          delete req.body._id;

      for(var p in req.body){
          req.form[p] = req.body[p];
      }

      req.form.save(function(err){
          if(err)
              res.status(500).send(err);
          else{
              res.json(req.form);
          }
      });
  })
  .delete(function(req, res){
      req.form.remove(function(err){
          if(err)
              res.status(500).send(err);
          else{
              res.status(204).send('removed');
          }
      });
  });*/ //not neccesary at the moment

  formRouter.route('/submissions/:formId')
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


  return formRouter;
};

module.exports = routes;
