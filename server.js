const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ronak", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a schema for the user data
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNo: String,
  email: String,

  street: String,
  city: String,
  state: String,
  country: String,

  loginId: String,
  password: String,
  creationTime: { type: Date, default: Date.now },
  updationTime: { type: Date, default: Date.now },
});

// Define a model based on the schema
const User = mongoose.model("User", userSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (HTML, JavaScript)
app.use(express.static("public"));

// Endpoint to get all submitted data
app.get("/data", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error("Error occurred while fetching data from MongoDB", err);
    res.status(500).send("Error occurred while fetching data from MongoDB");
  }
});

// Endpoint to handle form submission
app.post("/submit", async (req, res) => {
  try {
    const userData = req.body;
    // Create a new user document using the model
    const newUser = new User(userData);
    // Save the user document to the database
    await newUser.save();
    console.log("Data inserted successfully");
    res.json(newUser); // Return the inserted user data as JSON
  } catch (err) {
    console.error("Error occurred while inserting data into MongoDB", err);
    res.status(500).send("Error occurred while inserting data into MongoDB");
  }
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
