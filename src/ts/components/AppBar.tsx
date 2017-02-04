import React, {Component} from 'react';
import {Link} from 'react-router';
import {AppBar} from 'material-ui';
import Menu from 'components/Menu';

// Scroll logic based on https://gist.github.com/Warry/4254579

const barStyle = {
  position: 'fixed',
  transform: 'translate3d(0,0,0)',
  MozTransform: 'translate3d(0,0,0)',
  WebkitTransform: 'translate3d(0,0,0)'
};

const titleStyle = {
  fontFamily: 'Junicode',
  fontSize: 43,
  color: '#AD000D',
  padding: '3px 0 0 14px',
  marginBottom: -3
};

export default class AppBarOwn extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {visible: false};
    this.handleScroll = this.handleScroll.bind(this)
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.handleScroll();
  }

  componentWillUnmount() {
    this.handleScroll = () => null;
  }

  handleScroll() {
    if (this.state.visible && window.scrollY === 0) {
      this.setState({visible: false});
      this.forceUpdate();
    } else {    
      if (!this.state.visible && window.scrollY > 0) {
        this.setState({visible: true});
        this.forceUpdate();
      }
    }
    // there is a polyfill in js/polyfills.js
    window.requestAnimationFrame(this.handleScroll);
  }

  render() {
    const line = this.state.visible ? (
        <div className="app-bar-line"></div>
      ) : null;

    return (
      <AppBar
        zDepth={0} // switch off box-shadow
        style={barStyle}
        title={<Link to="/">&#5809;</Link>}
        titleStyle={titleStyle}
        showMenuIconButton={false}
        iconElementRight={<Menu />}
      >
        {line}
      </AppBar>);
  }
}


