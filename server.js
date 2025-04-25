const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, '../users.xml');

function readUsersFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      xml2js.parseString(data, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });
}

function writeUsersFile(usersObj) {
  return new Promise((resolve, reject) => {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(usersObj);
    fs.writeFile(usersFilePath, xml, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const usersData = await readUsersFile();
    const users = usersData.users.user || [];
    const user = users.find(u => u.username[0] === username && u.password[0] === password);
    if (user) {
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const usersData = await readUsersFile();
    const users = usersData.users.user || [];

    const existingUser = users.find(u => u.username[0] === username);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    users.push({ username: [username], password: [password] });
    usersData.users.user = users;

    await writeUsersFile(usersData);

    return res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`User auth service running on http://localhost:${PORT}`);
});
