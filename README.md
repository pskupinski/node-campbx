node-campbx
=====

An unofficial node.js client for the [camp bx api](https://campbx.com/api.php) supporting only public market data api methods at the moment.

## Usage

```javascript
var CampBX = require('campbx'),
    campBX = new CampBX();

campBX.depth(function(err, data) {
  if(err) {
    throw err;
  }

  console.log(data);
});

campBX.ticker(function(err, data) {
  if(err) {
    throw err;
  }

  console.log(data);
});
```

## License

This module is [ISC licensed](https://github.com/scud43/node-campbx/blob/master/LICENSE.txt).
