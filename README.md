node-campbx
=====

An unofficial node.js client for the [camp bx api](https://campbx.com/api.php) including public market data api methods.

## Installation

node-campbx is available as `campbx` on npm.

```
npm install campbx
```

## Usage

```javascript
var CampBX = require('campbx'),
    campBXTrade = new CampBX("YourUsername", "YourPassword"),
    // To use the testnet version of CampBX's api
    campBXTestNet = new CampBX("YourUsername", "YourPassword", { testnet: true }),
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

## Reference

A method-by-method [reference](https://github.com/pskupinski/node-campbx/wiki/API-Reference) is available on the wiki.

## License

This module is [ISC licensed](https://github.com/pskupinski/node-campbx/blob/master/LICENSE.txt).
