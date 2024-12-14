import fs from 'fs/promises';
import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

function folderExists(folderName) {
  const folderPath = path.join(__dirname, folderName);
  return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory();
}

app.get('/users', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading data file');
      }
      res.json(JSON.parse(data));
    });
  } else {
    return res.status(404).send('data.json file not found');
  }
});

app.get('/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({ random: randomNumber });
});

app.get('/html', (req, res) => {
  const htmlContent = `
        <html>
            <head><title>Simple HTML Table</title></head>
            <body>
                <table border="1">
                    <tr><th>ID</th><th>Name</th></tr>
                    <tr><td>1</td><td>Alice</td></tr>
                    <tr><td>2</td><td>Bob</td></tr>
                </table>
            </body>
        </html>
    `;
  res.send(htmlContent);
});

app.get('/current-time', (req, res) => {
  const currentTime = new Date().toISOString();
  res.json({ currentTime });
});

app.get('/api', (req, res) => {
  const data = [
    { type: 'user', id: 1, name: 'Alice' },
    { type: 'user', id: 2, name: 'Bob' },
    { type: 'animal', id: 1, name: 'Dog' },
    { type: 'post', id: 1, title: 'First Post' },
  ];
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
