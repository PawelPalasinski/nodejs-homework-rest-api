const Contact = require("./schemas/contacts");

const getAll = async () => {
  return Contact.find({}).lean();
};

const getById = (id) => {
  return Contact.findById({ _id: id });
};

const create = ({ title, text }) => {
  return Contact.create({ title, text });
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
  create,
  update,
  remove,
};