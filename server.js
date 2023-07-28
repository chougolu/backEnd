const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const orderDetailsRouter = require('./routes/orderDetailsRoutes');
const orderItemsRouter = require('./routes/orderItemRoutes');
const fileUploadRouter = require('./routes/fileUploadRoutes')
require('./models/index');
const app = express()

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('uploads'));

app.use(userRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(orderDetailsRouter);
app.use(orderItemsRouter);
app.use(fileUploadRouter);

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});