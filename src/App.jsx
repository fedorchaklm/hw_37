import styles from './App.module.css'
import { useEffect, useRef, useState } from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteItem from './components/NoteItem/NoteItem';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('No title');
  const inputTitleRef = useRef(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch(() => setError("Something went wrong"));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function handleSubmit(event) {
    event.preventDefault();
    if (inputRef.current.value !== '') {
      setNotes([inputRef.current.value, ...notes]);
      inputRef.current.value = '';
    }
  }

  function handleChangeTitle(event) {
    console.log('change title', inputTitleRef.current.value);
    event.preventDefault();
    if (inputTitleRef.current.value !== '') {
      setTitle(inputTitleRef.current.value);
      inputTitleRef.current.value = '';
    }
  }

  function handleDelete(index) {
    notes.splice(index, 1)
    setNotes([...notes]);
  }

  if (error) {
    return (
      <p className={styles.error_info}>Error: {error} </p>
    );
  }

  if (!user) {
    return (
      <p className={styles.loading_info}>Loading...</p>
    );
  }

  return (
    <div className={styles.app}>
      <p className={styles.user_info}>UserName: <b>{user.name}</b></p>
      <h1>Your notesList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userNote"
          placeholder='Enter note'
          ref={inputRef}
        />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleChangeTitle}>
        <input
          type="text"
          name="notesTitle"
          placeholder='Enter title'
          ref={inputTitleRef}
        />
        <button type="submit">Change title</button>
      </form>
      <NoteList title={title}>
        {notes.length === 0 ? <p className={styles.notes_wrap}>There are no notes</p> :
          notes.map((note, index) => <NoteItem note={note} key={index} onDelete={() => handleDelete(index)} />)}
      </NoteList>
    </div>
  )
}

export default App