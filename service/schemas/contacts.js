const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    phone: {
      type: String,
      minlength: 9,
      maxlength: 15,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
