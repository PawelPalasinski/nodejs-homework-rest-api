const User = require("../service/schemas/user");
const { NotFound, BadRequest } = require("http-errors");

const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

// Send e-mail
const sendEmail = async (data) => {
  const email = { ...data, from: "pawel.palasinski@gmail.com" };
  try {
    await sgMail.send(email);
    console.log("Email send");
  } catch (error) {
    console.log(error);
  }
};

// Verify by SendGrid
const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound("User do not exist or not verify");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification email sent",
  });
};

// Reverify by SendGrid
const reverify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound(`User with email ${email} do not exist`);
  }

  if (user.verify && !user.verificationToken) {
    throw new BadRequest("Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Please Verify Your Email",
    html: `<p><a href='http://localhost:4000/api/users/verify/${user.verificationToken}' target='_blank'>Let's confirm your email: ${user.email}  and you can start using app.</a></p>`,
  };

  await sendEmail(verifyEmail);
  res.status(200).json({
    essage: "Verification email sent",
  });
};

module.exports = { sendEmail, verify, reverify };
