'use strict';

/*!
 * ts-aggregate
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/*!
 * Module dependencies.
 */

var client = require('mongodb').MongoClient;

/**
 * Expose
 */

module.exports = main;

/**
 * Main
 */

function main (config, options, cb) {
  if (config.db) return aggregate(config.db, config, options, cb);

  client.connect(config.mongoUrl, function (err, db) {
    if (err) return cb(err);
    aggregate(db, config, options, cb);
  });
}

/**
 * Aggregate
 */

function aggregate (db, config, options, cb) {
  var collection = db.collection(config.collectionName);
  var dateField = '$' + options.dateField;

  var pipeline = [
    {
      $match: options.criteria || {}
    },
    {
      $project: {
        _id: 0,
        day: { $dayOfMonth: dateField },
        month: { $month: dateField },
        year: { $year: dateField }
      }
    },
    {
      $group: {
        _id: {
          year: { $substr: ['$year', 0, 4] },
          month: { $substr: ['$month', 0, 2] },
          day: { $substr: ['$day', 0, 2] },
        },
        count: { $sum: 1 },
      }
    },
    {
      $sort : {
        _id : -1
      }
    },
    {
      $project: {
        _id: 0,
        date: { $concat: ['$_id.year', '-', '$_id.month', '-', '$_id.day'] },
        count: 1
      }
    }
  ];

  collection.aggregate(pipeline)
    .toArray(callback);

  /**
   * Callback
   */

  function callback (err, docs) {
    db.close();
    if (err) return cb(err);
    cb(null, docs);
  }
}
