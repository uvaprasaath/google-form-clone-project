const express =  require("express");
const path = require("path");


const app = express();



/** server and mongoose setup */
const port = process.env.PORT || 9000;

app.use(express.static('./build'));

app.get('*', (req, res) => {
    console.log("the request is added")
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  

app.listen(port);