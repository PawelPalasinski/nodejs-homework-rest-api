const express = require("express");
const router = express.Router();
const {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
  signup,
  login,
  auth,
  current,
  logout,
} = require("../controller");

const upload = require("../service/upload");
const updateAvatar = require("../controller/updateAvatar");

router.get("/contacts", get);
router.get("/contacts/:id", getById);
router.post("/contacts", create);
router.put("/contacts/:id", update);
router.patch("/contacts/:id/favorite", updateFavorite);
router.delete("/contacts/:id", remove);
router.post("/users/signup", signup);
router.post("/users/login", login);
router.get("/users/current", auth, current);
router.get("/users/logout", auth, logout);
router.patch("/users/avatar", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
