const nodemailer = require("nodemailer");
const Mailjet = require("node-mailjet");
module.exports = async function sendGridEmailSender(option) {
  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "carsharenaruka@gmail.com",
          Name: "Нууц үг сэргээх хүсэлт",
        },
        To: [
          {
            Email: option.to,
            Name: "Нууц үг сэргээх хүсэлт",
          },
        ],
        Subject: "Нууц үг сэргээх хүсэлт",
        TextPart: "Нууц үг сэргээх хүсэлт",
        HTMLPart: option.html,
      },
    ],
  });
  request
    .then((result) => {
      console.log("email sent");
      return true;
    })
    .catch((err) => {
      console.log("error", err.statusCode);
      return false;
    });
};
