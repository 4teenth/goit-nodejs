// Method #1++++++++++++++++++++++++++++++++++++++

const fs = require('fs').promises;
const path = require('path');

class Contacts {
  constructor() {
    this.contactsPath = path.resolve(__dirname, 'db', 'contacts.json');
  }
  getListContacts = async () => {
    // console.log(this.contactsPath);
    const contactsData = await fs.readFile(this.contactsPath, {
      encoding: 'utf-8',
    });
    return JSON.parse(contactsData);
  };

  getContactById = async id => {
    const contactsData = await this.getListContacts();
    return contactsData.find(contact => contact.id === id);
  };

  removeContactById = async id => {
    const contactsData = await this.getListContacts();
    const result = contactsData.filter(contact => contact.id !== id);
    fs.writeFile(this.contactsPath, JSON.stringify(result));
  };

  addContact = async (name, email, phone) => {
    const contactsData = await this.getListContacts();
    const id = contactsData.length ? [...contactsData].pop().id + 1 : 1;
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    contactsData.push(newContact);
    const contactsDataAsJSON = JSON.stringify(contactsData);
    fs.writeFile(this.contactsPath, contactsDataAsJSON);
    return newContact;
  };
}

module.exports = new Contacts();

// Method#2++++++++++++++++++++++++++++++++++++++

// const fs = require('fs');
// const path = require('path');

// const contactsPath = path.join(__dirname, './db/contacts.json');
// // https://nodejs.org/api/fs.html
// // https://nodejs.org/dist/latest-v12.x/docs/api/path.html
// // https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
// // https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

// function listContacts() {
//   // // for a test
//   // const a = 5;
//   // const b = 1;
//   // return a + b;
//   fs.readFile(contactsPath, 'utf8', (err, data) => {
//     if (err) throw err;
//     console.table(JSON.parse(data));
//     // return is optional
//     // return JSON.parse(data);
//   });
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath, 'utf8', (err, data) => {
//     if (err) throw err;
//     const contacts = JSON.parse(data);
//     const targetContact = contacts.find(({ id }) => id === contactId);
//     console.table(targetContact);
//     // return is optional
//     // return targetContact;
//   });
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, 'utf8', (err, data) => {
//     if (err) throw err;
//     const contacts = JSON.parse(data);
//     // const updatedListContacts = JSON.stringify(
//     //   contacts.filter(({ id }) => id !== contactId),
//     // );
//     // OR
//     const deletedContact = contacts.filter(({ id }) => id !== contactId);
//     const updatedListContacts = JSON.stringify(deletedContact);

//     reWriteListContacts(contactsPath, updatedListContacts, err);
//   });
// }

// const reWriteListContacts = (contactsPath, updatedListContacts, err) => {
//   fs.writeFile(contactsPath, updatedListContacts, err => {
//     if (err) throw err;
//     console.table(JSON.parse(updatedListContacts));
//   });
// };

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, 'utf8', (err, data) => {
//     if (err) throw err;

//     const contacts = JSON.parse(data);
//     const getIds = contacts.map(({ id }) => id);
//     // OR the same
//     // const getIds = contacts.map(contact => contact.id);
//     const getLastAndMaxId = Math.max(...getIds);
//     const id = getLastAndMaxId + 1;
//     // console.log(id);
//     const newContact = { id, name, email, phone };
//     contacts.push(newContact);
//     const updatedListContacts = JSON.stringify(contacts);

//     reWriteListContacts(contactsPath, updatedListContacts, err);
//   });
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
