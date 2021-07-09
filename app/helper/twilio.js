require("dotenv").config();
const accountSid = "AC6fd2d43f2bb5676c9227b7442f16ae7c";
const authToken = "2ef99772ab65753606a3955e70cd051d";
const serviceId = "VA8986341837865599054057d82e21d5ae";
const client = require("twilio")(accountSid, authToken);

exports.sendMessage = async function (mobile, message) {
  console.log("send message");
  await client.messages
      .create({
          body: `${message}`,
          from: `+12513561882`,
          to: `${mobile}`,
      })
      .then(message => console.log(message.sid));
}

exports.sendVerificationOtpOnPhone = async function (mobile) {
  let data = await client.verify
    .services(serviceId)
    .verifications.create({
      from: `+12513561882`,
      to: `${mobile}`,
      channel: `sms`,
    })
   return data;
};

exports.verifyOtpOnPhone = async function (otp, mobile, res) {
  let data = await client.verify.services(serviceId).verificationChecks.create({
    to: `${mobile}`,
    code: otp,
  });
  return data;
};

exports.sendOtpOnMail = async function (email) {
  let data = await client.verify
    .services(serviceId)
    .verifications.create({ to: email, channel: "email" });
  return data;
};

exports.verifyOtpOnMail = async function (otp, email) {
  let data = await client.verify
    .services(serviceId)
    .verificationChecks.create({ to: email, code: otp });
  return data;
};
