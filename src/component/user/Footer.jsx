import React from 'react';
import ReactDom from 'react-dom';
import {toMoney} from '../utils';

class Footer extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return <footer>
      <div className="left-copy">
        <h2>InstaBot</h2>
        <p>Get Unlimited Real Followers Automatically.</p>
        <p>Copyright © 2015 App Kitchen LLC. Handcrafted by a bunch of people who love Instagram.</p>
        <div className="left-icon">
          <ul>
            <li>
              <a href="#" target="_blank" >
                <img src="/images/IG.png"  width="100%" />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" >
                <img src="/images/facebook.png"  width="100%" />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" >
                <img src="/images/twitter.png"  width="100%" />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" >
                <img src="/images/email.png"  width="100%" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-data"></div>
    </footer>
  }
}
Footer.propTypes = {};

export default Footer;