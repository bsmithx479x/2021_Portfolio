const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const nodemailer = require("nodemailer");

let bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// sendFile will go here
// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });

app.use('/', express.static('public'))

app.use('/billy', function(req, res)  {
  res.send("Hello Billy")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
     auth: {
          user: 'bsmithx479x@gmail.com',
          pass: 'xptpcnowfvepkdpf',
       },
  secure: true,
  });

  app.post("/submit-form", (req, res) => {
    const name = req.body.fname;
    const email = req.body.email;
    const text = req.body.subject;

    const mailData = {
      from: "emailt", // sender address
      to: "bsmithx479x@gmail.com", // list of receivers
      subject: `Sending Email using Node.js to ${name}`,
      text: text,
      html: `This is an email from ${email} and ${text}`
    };
  
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
  });

  // Make all text required
  // Make it look good with some css
  // Turn into a full website