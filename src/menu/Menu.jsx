import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames";
import "./Menu.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
    }


    render() {

        const {visible} = this.state;

        return (
            <div className={"menu"}>
                <div className={"menu__indicator"} onClick={() => {
                    this.setState({visible: !visible})
                }}>
                    <FontAwesomeIcon icon={faBars}/>
                </div>
                <div className={classNames("menu__list", {"menu__list--visible": visible})}>
                    <div className={"menu__list__item"}>
                        Corona-Fallzahlen
                    </div>
                    <div className={"menu__list__item"}>
                        Wahlergebnisse 2020
                    </div>
                    <div className={"menu__list__item"}>
                        Datenquellen
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;