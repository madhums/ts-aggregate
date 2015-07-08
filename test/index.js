'use strict';

/*!
 * Module dependencies.
 */

var aggregate = require('../lib');
var config = {
  mongoUrl: 'mongodb://localhost:27017/my_app',
  collectionName: 'users',
  // db: connection_string
};
var options = {
  dateField: 'created_on',
  criteria: {
    created_on: {
      $gte: new Date('2015-06-01'),
      $lte: new Date('2015-07-01')
    }
  }
};

/**
 * aggregate
 */

aggregate(config, options, function (err, docs) {
  if (err) return console.error(err);
  // done
  console.log(docs);
});
