import React from "react";
//import "../scss/header.scss"; 

const Header = ({children}) => {

  return (
  <header id="header">
    <div className="page-container">
      <div className="page-container__inner">
        <div className="page-container__main">
          {children}
        </div>
      </div>
    </div>
  </header>
  );
}

export default Header;