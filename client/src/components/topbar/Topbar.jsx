import React, {useState, useEffect } from 'react';
import './topbar.scss';

const Topbar = () => {

  const [show, setShow] = useState(false);
const transitionNavBar = () => {
  if (window.scrollY > 50) {
    setShow(true);
  } else {
    setShow(false);
  }
};

useEffect(() => {
  window.addEventListener('scroll', transitionNavBar);
  return () => window.removeEventListener('scroll', transitionNavBar);
}, []);

  return (
    <div className={`app__topbar ${show && 'sticky-top'}`}>
      <div className="app__topbar-left">perth</div>
      <div className="app__topbar-right">user</div>
    </div>
  );
};

export default Topbar;
