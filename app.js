const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./api/common/db");
//........above.full from........cors - cross origin resourse sharring.............//

const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/order");
const userRoutes = require("./api/routes/user");

const app = express();
app.use(morgan("dev"));  //doubt//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//-------------------------CORS CONNECTION START------------------------------
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     req.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });
app.use(cors());
//-------------------------CORS CONNECTION END------------------------------

//-------------------------MONGO CONNECTION START------------------info - ${username} - is called templete string-----

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("MongoDB connected successfully");
});
//-------------------------MONGO CONNECTION END------------------------------

//-------------------------ADDING ROUTES AND CONTROLLER START---------------
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);

//-------------------------ADDING ROUTES AND CONTROLLER END---------------

//-------------------------ERROR HANDLING START------------------------------
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//-------------------------ERROR HANDLING END------------------------------

module.exports = app;
