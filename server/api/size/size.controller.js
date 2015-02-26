'use strict';

var _ = require('lodash');
var Size = require('./size.model');

// Get list of sizes
exports.index = function(req, res) {
  Size.find(function (err, sizes) {
    if(err) { return handleError(res, err); }
    return res.json(200, sizes);
  });
};

// Get a single size
exports.show = function(req, res) {
  Size.findById(req.params.id, function (err, size) {
    if(err) { return handleError(res, err); }
    if(!size) { return res.send(404); }
    return res.json(size);
  });
};

// Creates a new size in the DB.
exports.create = function(req, res) {
  Size.create(req.body, function(err, size) {
    if(err) { return handleError(res, err); }
    return res.json(201, size);
  });
};

// Updates an existing size in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Size.findById(req.params.id, function (err, size) {
    if (err) { return handleError(res, err); }
    if(!size) { return res.send(404); }
    var updated = _.merge(size, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, size);
    });
  });
};

// Deletes a size from the DB.
exports.destroy = function(req, res) {
  Size.findById(req.params.id, function (err, size) {
    if(err) { return handleError(res, err); }
    if(!size) { return res.send(404); }
    size.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}