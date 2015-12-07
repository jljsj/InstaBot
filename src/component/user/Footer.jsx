import React from 'react';
import ReactDom from 'react-dom';
import {toMoney} from '../utils';
import Message from '../Message';

class Footer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      totalLikes: 0,
      totalComments: 0,
      totalFollows: 0
    }
  }

  componentWillMount() {
    $.ajax({
      type: 'POST',
      url: 'http://139.162.27.27:8080/statistics',
      data: '',
      success: (data)=> {
        if (data.code === '200') {
          this.setState({
            totalLikes: data.site_statistics.totalLikes,
            totalComments: data.site_statistics.totalComments,
            totalFollows: data.site_statistics.totalFollows
          })
        }
        const m = Message.success({content: data.msg});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000);
      },
      error: ()=> {
        const m = Message.success({content: data.msg});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000);
      }
    });
  }

  render() {
    return <footer>
      <div className='footer-wap'>
        <div className="left-copy">
          <h2>Fastfame</h2>
          <p>Get Unlimited Real Followers Automatically.</p>
          <p>Copyright © 2015-2016 App Kitchen LLC. Handcrafted by a bunch of people who love Instagram.</p>
          <div className="left-icon">
            <ul>
              <li>
                <a href="http://instagram.com/instafame_club" target="_blank" >
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
        <div className="right-data">
          <ul>
            <li>
              <span>
                <h1>{toMoney(this.state.totalLikes)}</h1>
                <p>HEARTS SENT</p>
              </span>
              <i className='like-icon'></i>

            </li>
            <li>
              <span>
                <h1>{toMoney(this.state.totalFollows)}</h1>
                <p>COMMENTS SENT</p>
              </span>
              <i className='comm-icon'></i>

            </li>
          </ul>
        </div>
      </div>
    </footer>
  }
}
Footer.propTypes = {};

export default Footer;