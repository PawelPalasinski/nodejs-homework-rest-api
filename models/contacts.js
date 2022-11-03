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

const getContactById = async (id) => {
  const contacts = await listContacts();

  const contact = contacts.find((element) => element.id === id);

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
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE - Remove contact by id from the list

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(id);
    const itemIndex = contacts.findIndex((element) => element.id === id);
    if (itemIndex === -1) {
      return null;
    }
    contacts.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

// Contact update

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const itemIndex = contacts.findIndex((element) => element.id === id);
  if (itemIndex === -1) return null;
  contacts[itemIndex] = { ...contacts[itemIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[itemIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
