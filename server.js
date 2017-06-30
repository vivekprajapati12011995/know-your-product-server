const app = require('./app');
const config = require('./config.js');

app.listen(config.get('port'), config.get('ip'),function(){
    console.log("App listening on port " + config.get('port'));
});
