'use strict';

angular.module('cornerfindApp')
  .factory('size', function ($resource) {
    return $resource('/api/sizes/:id',{id:'@_id'})
});
