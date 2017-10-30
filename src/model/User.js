import React, {Component} from 'react';
import axios from 'axios';
import './User.css';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.user.id,
            name: props.user.name,
            email: props.user.email,
            phone: props.user.phone
        };

        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(event) {
        event.preventDefault();

        axios.delete("http://localhost:8081/API/users/" + this.state.id)
            .then(() => {
                this.setState({id: undefined});
            })
            .catch(() => {
                console.log("user " + this.state.id + " wasn't removed")
            })
    }

    render() {
        if (this.state === null || this.state.id === undefined)
            return null;

        return (
            <div className="User">
                <span className="User-id">{this.state.id}</span>
                <span className="User-name">{this.state.name}</span>
                <span className="User-email">{this.state.email}</span>
                <span className="User-phone">{this.state.phone}</span>
                <span className="User-modifiers">
                    <button className="button-user-update" onClick={this.deleteUser}>Delete</button>
                </span>
            </div>
        );
    }
}

export default User;