const express = require('express')
const cors = require('cors')
const app = express()
const port = 3300

app.use(express.json());
app.use(cors())

let AUTH_SECRET = ""

app.post('/double-auth', (req, res, next) => {
    if (!req.body.code) {
      res.status(500).send({ message : 'No code was sent.'})
    }

    if (req.body.code === AUTH_SECRET) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
});

app.post('/login', (req, res, next) => {
  if (!req.body || !req.body.mail || !req.body.password) {
    res.status(500).send({ message : 'Incorrect login data was sent.'})
  } else {
    const authCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    AUTH_SECRET = authCode;

    res.status(200).send({
      user : {
        id: 1,
        mail : req.body.mail,
        auth_enabled : true,
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})