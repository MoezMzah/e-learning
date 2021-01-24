const express = require("express");
const connectDB = require("./config/db");
const path=require('path')

const app = express();
//connect Database
connectDB();



// init middleware
app.use(express.json({ extended: false }));
//define routes
app.use("/api/users", require("./routes/API/Users"));
app.use("/api/auth", require("./routes/API/Auth"));
app.use("/api/profile", require("./routes/API/Profile"));
app.use("/api/posts", require("./routes/API/Posts"));

//upload

const cors = require("cors");

const fileRoute = require("./routes/file");



app.use(cors());
app.use(fileRoute);
if (process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => (err ? console.error(err) : console.log(`🚀 is 🏃 on port ${PORT} `)));
