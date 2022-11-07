const Contact = require("./schemas/contacts");

const getAll = async () => {
  return Contact.find({}).lean();
};

const getById = (id) => {
  return Contact.findById({ _id: id });
};

const createNew = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const update = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const remove = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAll,
  getById,
  createNew,
  update,
  remove,
};
