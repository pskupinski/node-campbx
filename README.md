node-campbx
=====

An unofficial node.js client for the [camp bx api](https://campbx.com/api.php) including public market data api methods.

## Usage

```javascript
var CampBX = require('campbx'),
    campBXTrade = new CampBX("YourUsername", "YourPassword"),
    // No need to provide keys if you're only using the public api methods.
    campBXPublic = new CampBX();

// Public API method call
// Note: Could use "campBXTrade" here as well.
campBX.ticker(function(err, data) {
  if(err) {
    throw err;
  }

  console.log(data);
});

// Trade API method call.
campBX.myFunds(function(err, data) {
  if(err) {
    throw err;
  }

  console.log(data);
});
```

## License

This module is [ISC licensed](https://github.com/scud43/node-campbx/blob/master/LICENSE.txt).
