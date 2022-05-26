const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
let allUsers = require("../server/users.json");
const PORT = 3003;
app.use(bodyParser.json());

// var mysql = require("mysql");
// var connection = require("express-myconnection");

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//Get all the users
app.get("/api/getUsers", (req, res) => {
  console.log(req.query._page, "pages?");
  const users = allUsers;
  res.send(users.slice(0, req.query._page * 10));
});

//Add new user
app.post("/api/insert", (req, res) => {
  const Name = req.body.user.name;
  const Email = req.body.user.email;
  const ID = req.body.user.id;
  const Phone = req.body.user.phone;
  const IP = req.body.user.ip;

  allUsers.unshift(req.body.user); //or push
});

//Delete user
app.post("/api/delete", (req, res) => {
  const deleteID = req.body.id;
  allUsers = allUsers.filter((user) => user.ID !== deleteID);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("running test", PORT);
});

// app.get("/api/users", (req, res) => {
//   const sqlSelect = "SELECT * FROM Users";
//   db.query(sqlSelect, (err, result) => {
//     res.send(result);
//   });
// });

//   const sqlInsert =
//     "INSERT INTO Users (Name, Email, ID, Phone, IP) VALUES (?,?,?,?,?)";
//   db.query(sqlInsert, [Name, Email, ID, Phone, IP], (err, result) => {});
//   console.log(result);
// });

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   port: 3306,
//   database: "SQL",
// });
