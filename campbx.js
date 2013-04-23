var request = require("request");

var CampBX = function(username, password) {
  var self = this;
  self.publicUrl = "http://campbx.com/api/";
  self.url = "https://campbx.com/api/";
  self.username = username;
  self.password = password;

  self.makePublicRequest = function(method, callback) {
    request(self.publicUrl + method, function(err, response, body) {
      if(err || response.statusCode !== 200) {
        callback(new Error(err ? err : response.statusCode));
        return;
      }

      callback(null, JSON.parse(body));
    });
  };

  self.makeRequest = function(method, params, callback) {
    if(!self.username || !self.password) {
      callback(new Error("Must provide username and password to use the trade API."));
      return;
    }

    params.user = self.username;
    params.pass = self.password;
    request({ url: self.url + method, method: "POST", form: params }, function(err, response, body) {
      if(err || response.statusCode !== 200) {
        callback(new Error(err ? err : response.statusCode));
        return;
      }

      var result = JSON.parse(body);

      if(result.Error) {
        callback(new Error(result.Error));
        return;
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
