import React from 'react';
import ReactDom from 'react-dom';

class Timer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      timeClose: false,
      timeData: this.props.userData.remains,
    };

    this.timerInter = null;

    [
      'timeClick'
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  timeClick() {

    if (this.state.timeClose) {
      this.openInter();
    } else {
      this.closeInter();
    }

    this.setState({
      timeClose: !this.state.timeClose
    })
  }

  openInter() {
    this.timerInter = setInterval(()=> {
      const time = this.state.timeData - 1000;
      this.setState({
        timeData: time
      });
    }, 1000)
  }

  closeInter() {
    clearInterval(this.timerInter);
  }

  componentDidMount() {
    this.openInter();
  }

  componentWillUnmount(){
    this.closeInter();
  }

  timeToDays(timeData) {
    const timer = parseInt(timeData / 1000);
    const sec = timer % 60;
    const min = ((timer - sec) / 60) % 60;
    const time = ((timer - sec - min * 60) / 3600) % 24;
    const days = Math.floor(((timer - sec - min * 60) / 3600) / 24);
    return days + ' days - ' + time + ':' + min + ':' + sec;
  }

  render() {
    const days = this.timeToDays(this.state.timeData);
    return <div className="timer">
      <ul>
        <li>
          <h2>{days}</h2>
          <p>Activity time</p>
        </li>
        <li>
          <div className={`switch ${this.state.timeClose ? 'play' : 'stop'}`} onClick={this.timeClick}>
            <p>{this.state.timeClose ? 'Play' : 'Stop'}</p>
          </div>
        </li>
      </ul>
    </div>
  }
}
Timer.propTypes = {
  userData: React.PropTypes.object,
};

Timer.defaultProps = {
  userData: null,
};
export default Timer;