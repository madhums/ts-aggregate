## ts-aggregate

A simple wrapper for aggregating time series data for mongodb.

## Installation

```sh
npm install ts-aggregate
```

## Usage

```js
var aggregate = require('ts-aggregate');
var config = {
  mongoUrl: 'mongodb://localhost:27017/my_app',
  collectionName: 'users',
  // db: connection_string
};
var options = {
  dateField: 'created_on',            // date field which you want to show as time series
  criteria: {                         // criteria
    created_on: {
      $gte: new Date('2015-06-01'),
      $lte: new Date('2015-07-01')
    }
  }
};

aggregate(config, options, function (err, docs) {
  // console.log(docs);
  // =>
  // [ { count: 7, date: '2015-6-9' },
  //   { count: 9, date: '2015-6-8' },
  //   { count: 11, date: '2015-6-7' },
  //   { count: 4, date: '2015-6-6' },
  //   { count: 4, date: '2015-6-5' },
  //   { count: 3, date: '2015-6-4' } ]
});
```

## License

MIT
