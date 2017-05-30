import React, { Component } from 'react';
import {EMOJIS} from '../../constants';
import './styles.css';

const Loader = () => {

  return (
    <div className="Loader">
      <span className="Loader__icon Loader__icon--dog">{EMOJIS.DOG}</span>
      <span className="Loader__icon Loader__icon--cat">{EMOJIS.CAT}</span>
    </div>
  );
};

export default Loader;