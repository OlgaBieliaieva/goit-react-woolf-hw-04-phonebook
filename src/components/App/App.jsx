import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import SectionTitle from '../SectionTitle/SectionTitle';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return JSON.parse(savedContacts) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const isExist = contacts.find(
      contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const deleteContact = id => {
    const remainingContacts = contacts.filter(contact => contact.id !== id);

    setContacts([...remainingContacts]);
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <main className={css.appContainer}>
      <SectionTitle text="Phonebook" />
      <ContactForm addContact={addContact} />

      <SectionTitle text="Contacts" />
      <Filter filter={filter} filterChangeHandler={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts}
        onDeleteContact={deleteContact}
      />
    </main>
  );
}
