const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL


const categoriesRouter = require('./routes/categories')
const servicesRouter = require('./routes/services')
const usersRoutes = require('./routes/users');
const inquiriesRouter = require('./routes/inquiries')

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/services`, servicesRouter)
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/inquiries`, inquiriesRouter)







//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ServiFind",
})
    .then(() => {
        console.log("Database is connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

//Server
app.listen(3000, () => {
    console.log("server is running http://localhost:3000");
});
