import React, {Component} from 'react';
import "./AccidentDetails.scss";

class AccidentDetails extends Component {
    render() {
        const {id} = this.props;
        return (
            <div>
                Accident Details
                <br/>
                ID: {id}
            </div>
        );
    }
}

export default AccidentDetails;