var request = require("request");

var CampBX = function() {
  var self = this;
  self.publicUrl = "http://campbx.com/api/";

  self.makePublicRequest = function(method, callback) {
    request(self.publicUrl + method, function(err, response, body) {
      if(err || response.statusCode !== 200) {
        callback(err ? err : response.statusCode);
        return;
      }

      callback(false, JSON.parse(body));
    });
  };

  self.depth = function(callback) {
    self.makePublicRequest("xdepth.php", callback);
  };

  self.ticker = function(callback) {
    self.makePublicRequest("xticker.php", callback);
  };
};

module.exports = CampBX;
