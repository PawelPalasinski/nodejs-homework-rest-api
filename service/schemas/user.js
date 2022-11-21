const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bCrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-z ,.'-]+$/i.test(v);
        },
        message: "Please enter a valid username",
      },
      required: [true, "Username required"],
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm.test(
            v
          );
        },
        message:
          "Please enter a valid password (atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters)",
      },
      required: [true, "Password is required"],
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
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: { type: String },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
