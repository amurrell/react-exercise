import React, {Component} from 'react';

import UserInfo from '../UserInfo';
import capitalizeWords from '../../utils/capitalizeWords';
import './styles.css';

export default class List extends Component {

  state = {
    sort: false,
    sortStyle: null
  }

  triggerSort = (order) => () => {
    this.setState({sort: true, sortStyle: order});
  }

  sortListByName = (order) => {
      const list = this.filterList();

      var sorted = list.sort(function(a, b) {
        return a.name.first.localeCompare(b.name.first);

      });

      return order === 'asc' ? sorted : sorted.reverse();
  }

  renderListUser = (user) => {
    const {type, userDeleteCallback} = this.props;

    return (
      <li className="List__item">
        <UserInfo user={user} listId={user.login.username} type={type} deleteCallback={userDeleteCallback}/>
      </li>
    );
  }

  filterList = () => {
    const {type, list} = this.props;
    const otherType = (type === 'dog') ? 'cat' : 'dog';

    return list.filter( (user) => {
      return user.count[type] > user.count[otherType]
    });

  }

  render() {
    const {type} = this.props;
    const sortCallback = this.triggerSort;
    const list = (this.state.sort) ? this.sortListByName(this.state.sortStyle) : this.filterList()

    return (
      <div className="List">
        <h2 className="List__title">
          {capitalizeWords(type)} People
        </h2>
        <button className="List__button" onClick={sortCallback('asc')}>A ⬆️</button>
        <button className="List__button" onClick={sortCallback('desc')}>Z ⬇️</button>
        <ul className="List__list">
        {list.map(this.renderListUser)}
        </ul>
      </div>
    );
  }
};