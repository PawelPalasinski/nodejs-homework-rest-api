const Jimp = require("jimp");
const fs = require("fs").promises;
const path = require("path");
const User = require("../service/schemas/user");

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  try {
    const storeImage = path.join(process.cwd(), "public/avatars");
    const { path: temporaryName, originalname } = req.file;

    await Jimp.read(`tmp/${originalname}`)
      .then((avatar) => {
        avatar.resize(250, 250).write(`tmp/${originalname}`);
      })
      .catch((err) => {
        console.error(err);
      });

    const ext = path.extname(originalname);
    const avatarNewName = `avatar${id}${ext}`;
    const fileName = path.join(storeImage, avatarNewName);

    await fs.rename(temporaryName, fileName);
    const avatarNewURL = `/avatars/${avatarNewName}`;
    const response = await User.findById(id, avatarNewURL);

    return res.status(200).json({
      avatar: response.avatarURL,
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = updateAvatar;
