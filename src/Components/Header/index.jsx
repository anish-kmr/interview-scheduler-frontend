import React from 'react';
import "./header.css"

const Header = (props) => {
    return (
        <div className="header-container">
            <div className="logo"></div>
            <div className="header-nav">
                {props.children}
            </div>
        </div>
    );
}


export default Header;
