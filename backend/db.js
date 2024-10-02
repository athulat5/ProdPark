const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true
        }).then((data)=>{
            console.log(`Mogodb connected with the server: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;

