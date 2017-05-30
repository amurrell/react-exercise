import React, { Component } from 'react';
import './styles.css';
import {EMOJIS} from '../../constants';

export default class VotingForm extends Component {

  render() {

    const {dogCallback, catCallback} = this.props;

    return (
      <div className="VotingForm">
        <button
          onClick={dogCallback}
          className="VotingForm__button VotingForm__button--alt-1"
          type="button"
        >
          <span className="VotingForm__button-icon">
            {EMOJIS.DOG}
          </span>
          <span className="VotingForm__button-text">
            Dogs
          </span>
        </button>


        <button
          onClick={catCallback}
          className="VotingForm__button VotingForm__button--alt"
          type="button"
        >
          <span className="VotingForm__button-icon">
            {EMOJIS.CAT}
          </span>
          <span className="VotingForm__button-text">
            Cats
          </span>
        </button>
      </div>
    );
  }
}