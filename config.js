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
      // mongodb://vivek_mongo_db:vivek@1200@ds133922.mlab.com:33922/onlinesh
      env: "DB_HOST"
    }
  },
  localAuth: {
    default:"12345-67890-54321-09876"
  },
  secretKey:{
    default:"afafa"
  }
});
 
conf.validate();
 
module.exports = conf;