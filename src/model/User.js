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

        this.updateUser = this.updateUser.bind(this);//todo: move to App
        this.deleteUser = this.deleteUser.bind(this);
    }

    updateUser(event) {
        event.preventDefault();

        axios.put("http://localhost:8081/API/users/")
            .then((response) => {
                this.setState(response);
            }).catch(() => {
            console.log("user " + this.state.id + " wasn't updated")
        })
    }

    deleteUser(event) {
        event.preventDefault();

        axios.delete("http://localhost:8081/API/users/" + this.state.id)
            .then(() => {
                this.setState({});
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
                    <button className="button-user-delete" onClick={this.updateUser}>Update</button>
                </span>
            </div>
        );
    }
}

export default User;