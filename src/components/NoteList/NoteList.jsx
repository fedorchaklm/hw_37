import styles from './NoteList.module.css';
import { Component } from "react";
import PropTypes from 'prop-types';

class NoteList extends Component {
  #title;

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
  }

  get title() {
    return `***${this.#title}***`;
  }

  set title(value) {
    const cleaned = value.replace(/[0-9\s]+/g, '');
    this.#title = !cleaned ? 'No title' : cleaned;
  }

  render() {
    this.title = this.props.title;
    return (
      <>
        <h2>{this.title}</h2>
        <ul className={styles.note_list}>
          {this.props.children}
        </ul>
      </>
    );
  }
}

export default NoteList;
