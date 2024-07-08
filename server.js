const app = require("./app.js");
const connectDB = require("./data/database");

connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    `Server is Started at PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
