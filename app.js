// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory user list (temporary until DB is added)
let users = [
  { name: "Arun", password: "Way@123", email: "arun@way.com", address: "Chennai, India" },
  { name: "John", password: "Pass@456", email: "john@way.com", address: "New York, USA" },
  { name: "Amy", password: "Amy@789", email: "amy@way.com", address: "London, UK" },
];

// Login credentials
const USERNAME = "admin";
const PASSWORD = "way@123";

// LOGIN SCREEN
app.get('/', (req, res) => {
  const loginPage = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Login - Way.com</title>
    <style>
      body { font-family: Arial; background:#f0f2f5; display:flex; justify-content:center; align-items:center; height:100vh; }
      .login-container { background:white; padding:40px; border-radius:12px; width:350px; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
      input { width:90%; padding:10px; margin:8px; border:1px solid #ccc; border-radius:8px; }
      button { background:#007bff; color:white; border:none; padding:10px 20px; border-radius:8px; cursor:pointer; }
      button:hover { background:#0056b3; }
      .error { color:red; }
    </style>
  </head>
  <body>
    <div class="login-container">
      <h2>Login to Way.com</h2>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
      </form>
      ${req.query.error ? `<p class="error">Invalid credentials</p>` : ""}
    </div>
  </body>
  </html>`;
  res.send(loginPage);
});

// LOGIN VERIFY
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/?error=true');
  }
});


// DASHBOARD PAGE (SHOW USERS + ADD USER BUTTON)
app.get('/dashboard', (req, res) => {

  let userRows = users
    .map(u => `<tr><td>${u.name}</td><td>${u.password}</td><td>${u.email}</td><td>${u.address}</td></tr>`)
    .join("");

  const dashboard = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Dashboard - Way.com</title>
    <style>
      body { font-family: Arial; background:#f4f6f8; padding:40px; }
      table { border-collapse: collapse; width:80%; margin:auto; background:white; border-radius:10px; overflow:hidden;
        box-shadow:0 2px 8px rgba(0,0,0,0.1); }
      th, td { padding:12px 20px; border-bottom:1px solid #ddd; }
      th { background:#007bff; color:white; }
      tr:hover { background:#f1f1f1; }
      .add-btn {
        display:block; width:200px; margin:20px auto;
        background:#28a745; color:white; padding:10px; text-align:center;
        border-radius:8px; text-decoration:none; font-weight:bold;
      }
      .add-btn:hover { background:#1e7e34; }
    </style>
  </head>
  <body>
    <a class="add-btn" href="/add-user">+ Add New User</a>

    <table>
      <caption style="font-size:1.5em; margin-bottom:10px; font-weight:bold;">User Details - Way.com</caption>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Password</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        ${userRows}
      </tbody>
    </table>
  </body>
  </html>
  `;
  res.send(dashboard);
});


// ADD USER FORM
app.get('/add-user', (req, res) => {
  const addUserForm = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Add User - Way.com</title>
    <style>
      body { font-family:Arial; background:#f0f2f5; display:flex; justify-content:center; align-items:center; height:100vh; }
      .form-box { background:white; padding:30px; width:400px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
      input { width:90%; padding:10px; margin:8px; border-radius:8px; border:1px solid #ccc; }
      button { background:#28a745; color:white; padding:10px 20px; border:none; border-radius:8px; cursor:pointer; }
      button:hover { background:#1e7e34; }
    </style>
  </head>
  <body>
    <div class="form-box">
      <h2>Add New User</h2>
      <form method="POST" action="/add-user">
        <input type="text" name="name" placeholder="User Name" required><br>
        <input type="text" name="password" placeholder="Password" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="text" name="address" placeholder="Address" required><br>
        <button type="submit">Add User</button>
      </form>
    </div>
  </body>
  </html>
  `;
  res.send(addUserForm);
});

// HANDLE ADD USER FORM SUBMISSION
app.post('/add-user', (req, res) => {
  const { name, password, email, address } = req.body;

  users.push({ name, password, email, address });

  res.redirect('/dashboard');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`demo-app listening on ${port}`);
});

module.exports = app;
