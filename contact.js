#!/usr/bin/env node

const program = require('commander');

const {
  addContact,
  getContact,
  getContactList,
  updateContact,
  deleteContact
  } = require('./logic');

const { prompt } = require('inquirer');

program
  .version('0.0.1')
  .description('Contact management system');

  const questions = [
    {
      type: 'input',
      name: 'firstname',
      message: 'Enter firstname...'
    },
    {
      type: 'input',
      name: 'lastname',
      message: 'Enter lastname...'
    }, {
      type: 'input',
      name: 'phone',
      message: 'Enter phone number...'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email address...'
    }
  ];

  program
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
      prompt(questions).then(answers =>
        addContact(answers));
    // .action((firstname, lastname, phone, email) => {
    //   addContact({firstname, lastname, phone, email});
    });

  program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name));

  program
    .command('updateContact <_id>')
    .alias('u')
    .description('Update contact')
    .action(_id => {
      prompt(questions).then((answers) =>
        updateContact(_id, answers));
    });

    program
      .command('deleteContact <_id>')
      .alias('d')
      .description('Delete contact')
      .action(_id => deleteContact(_id));

    program
      .command('getContactList')
      .alias('l')
      .description('List contacts')
      .action(() => getContactList());

  if(!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
  }

program.parse(process.argv);
