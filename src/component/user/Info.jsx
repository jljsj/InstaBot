import React from 'react';
import ReactDom from 'react-dom';
import {toMoney} from '../utils';

class Info extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      timeClose: false,
    };
  }

  render() {
    return <div className="info">
      <ul>
        <li>
          <h2>{toMoney(this.props.likes)}</h2>
          <p>Likes</p>
        </li>
        <li>
          <h2>{toMoney(this.props.commentes)}</h2>
          <p>Commentes</p>
        </li>
      </ul>
    </div>
  }
}
Info.propTypes = {
  userData: React.PropTypes.object,
  likes: React.PropTypes.number,
  commentes: React.PropTypes.number,
};

Info.defaultProps = {
  userData: null,
  likes: 0,
  commentes: 0,
};
export default Info;