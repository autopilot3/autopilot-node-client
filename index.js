const request = require('request');

module.exports = (conf) => {
  if (!conf.autopilotAPIKey) {
    console.error("No autopilotAPIKey in config passed to autopilot-node-client");
    process.exit(1);
  }
  if (!conf.autopilotInstanceID) {
    console.error("No autopilotInstanceID in config passed to autopilot-node-client");
    process.exit(1);
  }
  if (!conf.autopilotAPIURL) {
    conf.autopilotAPIURL = 'https://api.ap3api.com';
  }

  const apRequest = (req, cb) => {
    const options = {
      timeout: 5000,
      method: req.method,
      url: `${conf.autopilotAPIURL}/${conf.autopilotInstanceID}${req.path}`,
      headers: {  
        'X-Api-Key': conf.autopilotAPIKey
      },
      json: req.json
    };
    request(options, function (err, res, body) {
      if (err) return cb(err);
      if (res.statusCode != 200) {
        return cb(Error(`Non-200 (${res.statusCode}) received recording activity`));
      }
      cb(null, body);
    });
  };
  
  return {
    addActivity: (activityID, attributes, cb) => {
      apRequest({
        method: 'POST',
        path: '/activities/create?async=true',
        json: [
          {
            "activity_id": activityID,
            "created": new Date(),
            "attributes": attributes
          }
        ]
      }, cb);
    }
  };
};