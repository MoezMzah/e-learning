const mongoose=require('mongoose');
const config=require('config');
const db=config.get('mongoURI');
const gravatar=require('gravatar');
mongoose.connect(db)
const connectDB = async () => {
    try {
      await mongoose.connect(db,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false
      });
        
      console.log(`💾 db is connected ...`);
    } catch (error) {
      console.error(err.message);
      process.exit(1)
    }
  };
  module.exports=connectDB

