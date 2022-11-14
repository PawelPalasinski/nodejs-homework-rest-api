const {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndRemove,
} = require("./schemas/contacts");


const getAll = async () => {
  return find({}).lean();
};

const getById = (id) => {
  return findById({ _id: id });
};

const createNew = (c) => {
  return create(c);
};

const update = (id, fields) => {
  return findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const remove = (id) => {
  return findByIdAndRemove({ _id: id });
};

module.exports = {
  getAll,
  getById,
  createNew,
  update,
  remove,
};
