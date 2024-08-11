import styles from './NoteList.module.css';
import { Component } from "react";
import PropTypes from 'prop-types';

class NoteList extends Component {
  #title;

  constructor(props) {
    super(props)
  }

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
  }

  get title() {
    console.log('get title');
    return `***${this.#title}***`;
  }

  set title(title) {
    console.log('set title');
    this.#title = title.replace(/[0-9\s]+/g, '');
  }


  componentDidMount() {
    console.log('componentDidMount');

    this.title = this.props.title;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');

    this.title = this.props.title; 
  }

  render() {
    return (
      <>
        <h2 className={styles.title}>{this.title}</h2>
        <ul className={styles.note_list}>
          {this.props.children}
        </ul>
      </>
    );
  }
}

export default NoteList;
