const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contacts.js");
const router = express.Router();

// GET all contacts (http://localhost:3000/api/contacts/)

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json({ body: contactsList });
});

// GET contacts by id (e.g. http://localhost:3000/api/contacts/1)

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await getContactById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD new contact (Postman: Body -> select: raw, JSON)

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  const contactsList = await listContacts();
  contactsList.push(contact);

  res.status(201).json({
    data: contact,
  });
});

// DELETE a contavts from the list (e.g. http://localhost:3000/api/contacts/5)

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await removeContact(contactId);
  res.status(204).json();
});

// PUT - Contact update

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
