/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Size = require('./size.model');

exports.register = function(socket) {
  Size.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Size.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('size:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('size:remove', doc);
}