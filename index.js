//const bodyParser = require("body-parser");
const express = require("express");
const connectToMongo = require("./config/Db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
//const userRouter = require("./routes/User");
connectToMongo();
const morgan = require("morgan");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
//routes
app.use("/api/user", require("./routes/User"));
app.use("/api/product", require("./routes/product"));
app.use("/api/blog", require("./routes/blogRoute"));
app.use("/api/category", require("./routes/ProductCategory"));
app.use("/api/blogCategory", require("./routes/blogCatRoute"));
app.use("/api/brand", require("./routes/brandRoutes"));
app.use("/api/coupon", require("./routes/couponRoute"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`port is listening to the port no ${PORT}`);
});
