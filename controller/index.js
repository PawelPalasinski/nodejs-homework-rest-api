const service = require("../service");
const passport = require("passport");
const User = require("../service/schemas/user");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const gravatar = require("gravatar");

// GET all contacts

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAll();
    res.status(200).json(contacts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// GET one contact by id

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await service.getById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// POST - add new contact (name, email, phone)

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await service.createNew({ name, email, phone });

    res.status(201).json(newContact);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// PUT - update information about contact

const update = async (req, res, next) => {
  const { id } = req.params;
  const contact = req.body;
  try {
    const result = await service.update(id, contact);
    if (result) {
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(404).json({
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// PATCH - add contact to favorites

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.update(id, { favorite });
    if (result) {
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(404).json({
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// DELETE contact

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.remove(id);
    if (result) {
      res.status(200).json({
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// Authorization

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Login

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
    subscription: user.subscription,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.status(200).json({
    data: {
      token,
      message: "You are logged in",
    },
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

// Signup

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const avatarURL = gravatar.url({ email, s: "200", r: "pg" });
    const newUser = new User({ username, email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      data: {
        message: "Registration successful",
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Current

const current = (req, res, next) => {
  const { username, email, subscription, avatarURL } = req.user;
  res.status(200).json({
    data: {
      message: `Authorization was successful: ${username}`,
      responseBody: {
        email: `${email}`,
        subscription: `${subscription}`,
        avatarURL: `${avatarURL}`,
      },
    },
  });
};

// Logout

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    message: "No Content",
  });
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
  auth,
  login,
  signup,
  current,
  logout,
};
