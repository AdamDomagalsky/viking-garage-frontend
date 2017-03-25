import * as React from 'react';

export default function Header(props) {
  return (
    <div className="cont header">
      <div className="title">
        VIKING
        <div className="title-in">
          GA
          <span className="replace">
            &nbsp;&nbsp;
            <span className="raido" />
          </span>
          AGE
        </div>
      </div>
      <div className="text">
        rent motorcycles and gear
        <br />
        find mechanics, coaches, trails
        <div className="text-in">
          everywhere in the world
        </div>
      </div>
    </div>
  );
}
