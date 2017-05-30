import React, {Component} from 'react';

import UserInfo from '../UserInfo';
import capitalizeWords from '../../utils/capitalizeWords';
import './styles.css';

export default class List extends Component {

//  @todo, figure out sorting and state
//  state = {
//    list: [],
//    sortedList: []
//  }
//
//  componentDidMount() {
//
//    if (!this.state.list.length) {
//      this.setState({list: this.filterList()});
//    }
//
//    console.log(this.props);
//    console.log(this.state.list.length);
//
//    if (!this.state.sortedList.length) {
//      this.setState({sortedList: this.filterList()});
//    }
//  }
//
//  sortListByName = (name, order) => () => {
//      var newList = this.state.sortedList.sort(function(a, b) {
//        var sort = a.name[name].localeCompare(b.name[name]);
//        return order === 'asc' ? sort : !sort;
//      });
//
//      this.setState({sortedList: newList});
//  }

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
    const list = this.filterList();
    const sort = this.sortListByName;

    return (
      <div className="List">
        <h2 className="List__title">
          {capitalizeWords(type)} People
        </h2>
        <button className="List__button" onClick="">A ⬆️</button>
        <button className="List__button" onClick="">Z ⬇️</button>
        <ul className="List__list">
        {list.map(this.renderListUser)}
        </ul>
      </div>
    );
  }
};