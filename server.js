const express = require("express");
const mongoose = require("mongoose");
const app = express();

const passport = require("passport");
const users = require("./routes/api/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; // Heroku Port
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
