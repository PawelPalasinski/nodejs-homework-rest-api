const service = require("../service");

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAll();
    // res.json({
    //   status: "success",
    //   code: 200,
    //   data: {
    //     contacts,
    //   },
    // });
     res.status(200).json(contacts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await service.getById(id);
    if (contact) {
      // res.json({
      //   status: "success",
      //   code: 200,
      //   data: { contact },
      // });
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

const create = async (req, res, next) => {
  // const contact = req.body;
  try {
    // const result = await service.create(contact);
    const newContact = await service.create(req.body);

    res.status(201).json({
      newContact
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const contact = req.body;
  try {
    const result = await service.update(id, {
      contact
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { result },
      });
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

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.update(id, { favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { result },
      });
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

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.remove(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
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

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
