const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const router = express.Router();

const { validationForPost, validationForPut } = require("./validation");

// GET all contacts (http://localhost:3000/api/contacts/)

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ body: contacts });
});

// Find contact by id (e.g. http://localhost:3000/api/contacts/1)

router.get("/:id", async (req, res, next) => {
  try {
    const data = await getContactById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new contact (Postman: Body -> select: raw, JSON)

router.post("/", async (req, res, next) => {
  const validatePost = validationForPost(req.body).error;
  if (validatePost) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }
  const contact = await addContact(req.body);
  res.status(201).json({
    data: { contact },
  });
});

// Remove contact by id from the list (e.g. http://localhost:3000/api/contacts/5)

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const deleteContact = await removeContact(id);
  console.log(deleteContact);
  res.status(204).json();
});

// PUT - Contact update (e.g. http://localhost:3000/api/contacts/1)

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = validationForPut(req.body);

    if (error) {
      return res.json({ status: 400, message: "missing fields" });
    }

    const contact = await updateContact(req.params.id, req.body);
    if (contact) {
      return res.status(200).json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: "Not Found!",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
