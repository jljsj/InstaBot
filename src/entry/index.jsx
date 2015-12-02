import '../common/lib.js';
import Content from '../component/index/Content';
import Banner from '../component/index/Banner';
import Community from '../component/index/Community';
import Pricing from '../component/index/Pricing';
import Footer from '../component/index/Footer';
import React from 'react';
import ReactDom from 'react-dom';
import ScrollPack from '../component/scrollPack';


class App extends React.Component {

  render() {
    return <ScrollPack className='index-wap' repeat={true}>
      <Banner className='banner' key='banner'/>
      <Content className="content-wap" key='content'/>
      <Community className="community-wap" key='comm'/>
      <Pricing className='pricing-wap' key='pri'/>
      <Footer/>
    </ScrollPack>
  }
}

ReactDom.render(<App />, document.getElementById('react-content'));
