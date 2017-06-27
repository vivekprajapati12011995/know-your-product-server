var convict = require('convict');
 
var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT"
  },
  database: {
    host: {
      default: "mongodb://localhost:27017/shoppingmart",
      env: "DB_HOST"
    }
  }
});
 
conf.validate();
 
module.exports = conf;