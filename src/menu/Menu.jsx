import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import "./Menu.scss";

class Menu extends Component {
    render() {
        return (
            <div className={"menu"}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
        );
    }
}

export default Menu;