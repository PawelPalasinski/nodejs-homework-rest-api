const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-z ,.'-]+$/i.test(v);
        },
        message: "Please enter a valid name",
      },
      required: [true, "Name required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    phone: {
      type: String,
      minlength: 9,
      maxlength: 15,
      required: [true, "Phone number required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
