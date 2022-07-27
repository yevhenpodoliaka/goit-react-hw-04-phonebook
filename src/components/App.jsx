import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Contactlist from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contactsStorage = JSON.parse(localStorage.getItem('contacts'))
    if (contactsStorage) {
      this.setState({contacts:contactsStorage})
    }
   
  }
  componentDidUpdate(prevProps, prevState) {
    const {contacts}=this.state
    if (prevState.contacts !==contacts) {
      localStorage.setItem('contacts',JSON.stringify(contacts))
    }

  } 
  addContact = contact => {
    const { contacts } = this.state;
    const name = contact.name.toLowerCase()
    const hasContact = contacts.find(el => el.name.toLowerCase() === name )
    if (hasContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };
  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisiblecontacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisiblecontacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter value={filter} onChahgeFilter={this.onChangeFilter} />

        <h2>Contacts</h2>
        <Contactlist
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
