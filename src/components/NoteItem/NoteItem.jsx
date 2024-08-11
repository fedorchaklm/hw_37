import styles from './NoteItem.module.css';
import PropTypes from 'prop-types';

function NoteItem({ note, onDelete }) {
  return (
    <li className={styles.item}>
      <p className={styles.item__description}>{note}</p>
      <button className={styles.item__delNoteBtn} onClick={onDelete}>Del</button>
    </li>
  );
}

NoteItem.propTypes = {
  note: PropTypes.string,
  onDelete: PropTypes.func
};

export default NoteItem;