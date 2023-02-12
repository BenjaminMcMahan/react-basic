const mongoose = require('mongoose').default;
require('dotenv').config();

// Clean up warning related to strictQuery
mongoose.set("strictQuery", false);
// Connect to Atlas cluster
mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}
);


module.exports = mongoose;