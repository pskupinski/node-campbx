var request = require("request");

var CampBX = function(username, password, params) {
  var self = this;

  self.username = username;
  self.password = password;

  if (params && params.testnet) {
    self.url = "https://testnet.campbx.com/api/";
  } else {
    self.url = "https://campbx.com/api/";
  }


  self.makePublicRequest = function(method, callback) {
    request(self.url + method, function(err, response, body) {
      if(err || response.statusCode !== 200) {
        return callback(new Error(err ? err : response.statusCode));
      }

      var result;
      try {
        result = JSON.parse(body);
      } catch (err) {
        return callback(new Error(err));
      }

      if(result.Error) {
        return callback(new Error(result.Error));
      }

      callback(null, result);
    });
  };

  self.makeRequest = function(method, params, callback) {
    if(!self.username || !self.password) {
      return callback(new Error("Must provide username and password to use the trade API."));
    }

    params.user = self.username;
    params.pass = self.password;
    request({ url: self.url + method, method: "POST", form: params }, function(err, response, body) {
      if(err || response.statusCode !== 200) {
        return callback(new Error(err ? err : response.statusCode));
      }

      var result;
      try {
        result = JSON.parse(body);
      } catch(error) {
        return callback(new Error(error));
      }

      if(result.Error) {
        return callback(new Error(result.Error));
      }

      callback(null, result);
    });
  };

  self.depth = function(callback) {
    self.makePublicRequest("xdepth.php", callback);
  };

  self.ticker = function(callback) {
    self.makePublicRequest("xticker.php", callback);
  };

  self.myFunds = function(callback) {
    self.makeRequest("myfunds.php", {}, callback);
  };

  self.myOrders = function(callback) {
    self.makeRequest("myorders.php", {}, callback);
  };

  self.myMargins = function(callback) {
    self.makeRequest("mymargins.php", {}, callback);
  };

  self.getBtcAddr = function(callback) {
    self.makeRequest("getbtcaddr.php", {}, callback);
  };

  self.sendInstant = function(CBXCode, btcAmount, callback) {
    self.makeRequest("sendinstant.php", { "CBXCode":CBXCode, "BTCAmt": btcAmount }, callback);
  };

  self.sendBtc = function(btcTo, btcAmount, callback) {
    self.makeRequest("sendbtc.php", { "BTCTo": btcTo, "BTCAmt": btcAmount }, callback);
  };

  self.tradeCancel = function(type, orderId, callback) {
    self.makeRequest("tradecancel.php", { "Type": type, "OrderID": orderId }, callback);
  };

  self.tradeEnter = function(tradeMode, quantity, price, callback) {
    self.makeRequest("tradeenter.php", { "TradeMode": tradeMode, "Quantity": quantity, "Price": price }, callback);
  };

  self.tradeAdv = function(tradeMode, price, quantity, optionalFields, callback) {
    var params = { "TradeMode": tradeMode, "Price": price, "Quantity": quantity };

    for(var k in optionalFields) {
      params[k] = optionalFields[k];
    }

    self.makeRequest("tradeadv.php", params, callback);
  };
};

module.exports = CampBX;
