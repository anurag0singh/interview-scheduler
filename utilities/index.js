const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// get iso dates or start-end time for a complete day
const getISODatesForADay = (date) => {
  const day = 60 * 60 * 24 * 1000;
  const startDate = new Date(date + " " + "00:00");
  const endDate = new Date(startDate.getTime() + day);
  const from = startDate.toISOString();
  const to = endDate.toISOString();
  return { from, to };
}

// get iso date strings for from and to for IST to work with database
const getToAndFromISODate = (startTime, endTime, date) => {
  const startTimeObj = new Date(date + " " + startTime);
  const endTimeObj = new Date(date + " " + endTime);
  const from = startTimeObj.toISOString();
  const to = endTimeObj.toISOString();
  return { from, to }
}

// Node mailer to send mail to the participants

const sendEmails = (mailData) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: "no-reply@gmail.com", // sender address
    to: mailData.to,
    subject: mailData.subject,
    html:
      `<div>
      <h2>Interview Name: ${mailData.name}</h3>
      <h3>From: ${mailData.startTime}</h5>
      <h3>To: ${mailData.endTime}</h5>
      <h2>Interview Description: </h3>
      <h3>${mailData.description || "No Description Provided"}</h4>
    </div>`
  });
}

module.exports = { getISODatesForADay, getToAndFromISODate, sendEmails };