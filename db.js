const mongoose = require('mongoose');

module.exports = () => {
    const ConnectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB, ConnectionParams);
        console.log("Connection was Successful");
    } catch (error) {
        console.log(error);
    }
}