import React, { Component } from 'react';
import firebase from 'firebase';
import {dbConfig} from './dbConfig';

import logo from './logo.svg';
import './App.css';

import capitalizeWords from './utils/capitalizeWords';

import Loader from './components/Loader';
import UserInfo from './components/UserInfo';
import VotingForm from './components/VotingForm';
import List from './components/List';

class App extends Component {

  state = {
    user: null,
    list: [],
    useLoader: false
  }

  removeUserFromList = (username) => {
    const {list} = this.state;

    var newList = list.filter( (user) => {
      return user.login.username !== username;
    });

    this.setState({list: newList});
  }

  addUserToList = (user) => {
    const {list} = this.state;

    this.setState({list: [...list, user]});
  }

  getUserData = () => {

    // use loader for just vote section if we have a user already.
    if (this.state.user) {
      this.setState({useLoader: true});
    }

    fetch('https://randomuser.me/api')
      .then(data => data.json())
      .then(data => {
        this.setState({
          user: data.results[0],
          useLoader: false
        });
    });
  }

  handlePetSelect = (pet, user) => {
    const {username} = user.login;
    const userRef = 'dogorcat/users/' + username;
    const {database} = this;

    // see if user exists, increment count if so
    // or if it doenst exist, push up the new user and its new count
    database.ref(userRef)
      .once('value')
      .then(function(snapshot) {
        var userFound = snapshot.val();

        if (userFound) {
          userFound.count[pet]++;
          database.ref(userRef).set(userFound);
          return;
        }

        user.count = {
          dog: 0,
          cat: 0
        };

        user.count[pet]++;

        database.ref(userRef).set(user);
      });


    // refresh this list
    this.getUserData();
    // get stats on user (ie if voted on before)
  }

  userDeleteCallback = (username) => () => {

    const userDelRef = 'dogorcat/users/' + username;
    const {database} = this;

    database.ref(userDelRef).remove();
  }

  componentDidMount() {
    this.getUserData();

    // Initialize Firebase
    firebase.initializeApp(dbConfig);
    this.database = firebase.database();

    // add listener for populating lists with firebase data
    const usersRef = this.database.ref('dogorcat/users/');

    usersRef.on('child_added', (data) => {
      this.addUserToList(data.val());
    });

    usersRef.on('child_removed', (data) => {
      this.removeUserFromList(data.key);
    });

  }

  render() {

    const {user, list, useLoader} = this.state;

    if (!user) {
      return (
        <div className="App__loader">
          <Loader />
        </div>
      );
    }

    return (
      <div className="App">

        <div className="App__section App__section--vote">

          <h1 className="App__title">
          Does "
            <span className="highlight">
              {capitalizeWords(user.name.first + ' ' + user.name.last)}
            </span>
          " look like a cat or dog person?
          </h1>

          <div className="App__card">
            <UserInfo user={user} useLoader={useLoader} />
            <VotingForm
                  dogCallback={() => {this.handlePetSelect('dog', user)}}
                  catCallback={() => {this.handlePetSelect('cat', user)}}
            />
          </div>

        </div>

        <hr/>

        <div className="App__section App__section--list">
            <List list={list} type="dog" userDeleteCallback={this.userDeleteCallback} />
            <List list={list} type="cat" userDeleteCallback={this.userDeleteCallback} />
        </div>

      </div>
    );
  }
}

export default App;
