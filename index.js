// Method #1++++++++++++++++++++++++++++++++++++++

const Contacts = require('./contacts');

const argv = require('yargs').argv;
// OR
// const { argv } = require('yargs');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const getList = async () => {
        const list = await Contacts.getListContacts();
        console.table(list);
      };
      getList();
      break;

    case 'get':
      const getContact = async () => {
        const get = await Contacts.getContactById(id);
        console.table(get);
      };
      getContact();
      break;

    case 'add':
      const addContact = async () => {
        const add = await Contacts.addContact(name, email, phone);
        const list = await Contacts.getListContacts();
        console.table(add);
        console.table(list);
      };
      addContact();
      break;

    case 'remove':
      const removeContact = async () => {
        const remove = await Contacts.removeContactById(id);
        const list = await Contacts.getListContacts();
        console.table(remove);
        console.table(list);
      };
      removeContact();
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// Method#2++++++++++++++++++++++++++++++++++

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require('./contacts');
// // for a test
// // console.log(Contacts.listContacts());
// // console.log(listContacts());

// const argv = require('yargs').argv;

// const invokeAction = ({ action, id, name, email, phone }) => {
//   switch (action) {
//     case 'list':
//       listContacts();
//       break;

//     case 'get':
//       getContactById(id);
//       break;

//     case 'remove':
//       removeContact(id);
//       break;

//     case 'add':
//       addContact(name, email, phone);
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// };

// invokeAction(argv);
