import React, { Component } from 'react';

import Loader from '../../components/Loader';
import capitalizeWords from '../../utils/capitalizeWords';
import './styles.css';

export default class UserInfo extends Component {

  render() {
    const {user, listId, type, useLoader, deleteCallback} = this.props;

    if (useLoader) {
      return (
        <Loader />
      );
    }

    if (listId == undefined || !listId.length) {
      return (
        <div className="UserInfo">
          <div className="UserInfo__name">
            {capitalizeWords(user.name.first + ' ' + user.name.last)}
          </div>
          <div className="UserInfo__img">
            <img className="UserInfo__img-img" src={user.picture.large} />
          </div>
        </div>
      );
    }

    return (
      <div className="UserInfo">
        <div className="UserInfo__name">
          {capitalizeWords(user.name.first + ' ' + user.name.last)}
        </div>
        <div
          onClick={deleteCallback(listId)}
          className={ `UserInfo__img UserInfo__img--${type} UserInfo__img--delete-on-click` }>
          <img className="UserInfo__img-img" src={user.picture.large} />
        </div>
      </div>
    );



  }
};
