var request = require("request");

function CampBX (username, password, params) {
  var self = this;

  self.username = username;
  self.password = password;

  if (params && params.testnet) {
    self.url = "https://testnet.campbx.com/api/";
  } else {
    self.url = "https://campbx.com/api/";
  }
}

CampBX.prototype.makePublicRequest = function(method, callback) {
  var self = this;
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

CampBX.prototype.makeRequest = function(method, params, callback) {
  var self = this;
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

CampBX.prototype.depth = function(callback) {
  this.makePublicRequest("xdepth.php", callback);
};

CampBX.prototype.ticker = function(callback) {
  this.makePublicRequest("xticker.php", callback);
};

CampBX.prototype.myFunds = function(callback) {
  this.makeRequest("myfunds.php", {}, callback);
};

CampBX.prototype.myOrders = function(callback) {
  this.makeRequest("myorders.php", {}, callback);
};

CampBX.prototype.myMargins = function(callback) {
  this.makeRequest("mymargins.php", {}, callback);
};

CampBX.prototype.getBtcAddr = function(callback) {
  this.makeRequest("getbtcaddr.php", {}, callback);
};

CampBX.prototype.sendBtc = function(btcTo, btcAmount, callback) {
  this.makeRequest("sendbtc.php", { "BTCTo": btcTo, "BTCAmt": btcAmount }, callback);
};

CampBX.prototype.tradeCancel = function(type, orderId, callback) {
  this.makeRequest("tradecancel.php", { "Type": type, "OrderID": orderId }, callback);
};

CampBX.prototype.tradeEnter = function(tradeMode, quantity, price, callback) {
  this.makeRequest("tradeenter.php", { "TradeMode": tradeMode, "Quantity": quantity, "Price": price }, callback);
};

CampBX.prototype.tradeAdv = function(tradeMode, price, quantity, optionalFields, callback) {
  var params = { "TradeMode": tradeMode, "Price": price, "Quantity": quantity };

  for(var k in optionalFields) {
    params[k] = optionalFields[k];
  }

  this.makeRequest("tradeadv.php", params, callback);
};

module.exports = CampBX;
