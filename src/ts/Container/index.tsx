import * as React from 'react';
import { Link } from 'react-router';
import { default as AppBarVG } from '../AppBar';
import Footer from '../Footer';
// import Header from '../Header';

export default function Container(props) {
  return (
     <div>
      <AppBarVG />
      {props.children}
      <Footer />
    </div>
  );
}
