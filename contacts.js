const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const contacts = JSON.parse(data);
    console.log('Contacts list: ');
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    const contacts = JSON.parse(data);

    contacts.filter(contact => {
      if (contact.id === contactId) {
        console.log('Contact by ID:');
        console.table(contact);
      }
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter(
      contact => contact.id !== contactId,
    );

    console.log('New contact list:');
    console.table(filteredContacts);

    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
      if (err) {
        throw err;
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const contacts = JSON.parse(data);

    contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(contact);

    console.log('New contact:');
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
      if (err) {
        throw err;
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
