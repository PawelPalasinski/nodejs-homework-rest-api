const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

// GET - Get all contacts

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// GET - Find contact by id

const getContactById = async (contactId) => {
  const contactsArr = await listContacts();
  const contact = contactsArr.find(
    (element) => element.contactId === contactId
  );
  if (!contact) {
    return console.log("Contact not found");
  }
  return contact;
};

// POST - Add new contact

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    const newContactsArr = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsArr, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE - Remove contact by id from the list

const removeContact = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contact = await getContactById(contactId);
    const itemIndex = contactsArr.findIndex(
      (element) => element.id === contactId
    );
    if (itemIndex === -1) {
      return null;
    }
    contactsArr.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

// Contact update

const updateContact = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
