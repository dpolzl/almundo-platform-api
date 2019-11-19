import  express from 'express';
import  multer from 'multer'
import  cors from 'cors'
import  mongoose from 'mongoose'
 
export let UPLOAD_PATH = 'uploads'
export let PORT = 5000;
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
export let upload = multer({ storage: storage })
 
export const app = express();
app.use(cors());
 
const dbConfig = require('./config/database.config.js');

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to almundo"})
})

var routes = require('./routes')
 
app.listen(PORT, function () {
    console.log('listening on port: ' + PORT)
})