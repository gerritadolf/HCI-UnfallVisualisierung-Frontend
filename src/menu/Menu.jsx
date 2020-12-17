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
                        Corona Layer
                    </div>
                    <div className={"menu__list__item"}>
                        Election Results 2020 Layer
                    </div>
                    <div className={"menu__list__item"}>
                        Data Sources
                    </div>
                    <div className={"menu__list__item"}>
                        Software
                        {/*z.B. React, Font Awesome, Mapbox, die Wetter Icons usw.*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;