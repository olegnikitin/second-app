import React, {Component} from 'react';
import axios from 'axios';
import User from './model/User';

class App extends Component {

    constructor(props) {
        super(props);

        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    createUser(event) {
        event.preventDefault();

        const self = this;

        axios.post("http://localhost:8081/API/users/",
            {
                name: this.refs.name.value,
                email: this.refs.email.value,
                phone: this.refs.phone.value,
            })
            .then(response => {
                const newUsers = self.state.users.slice();
                newUsers.push(response.data);

                self.setState(() => ({
                    users: newUsers
                }));
            }).catch(() => {
                console.log("user wasn't created")
        });

        this.refs.userForm.reset();
    }

    updateUser(event) {
        event.preventDefault();

        const self = this;

        const requiredUserId = this.state.users.find(user => {
            if (user.name === this.refs.name.value)
                return user.id;
        }).id;

        //can be resolved if it is not found
        axios.put("http://localhost:8081/API/users/",
            {
                id: requiredUserId,
                name: this.refs.name.value,
                email: this.refs.email.value,
                phone: this.refs.phone.value
            }).then((response) => {
                self.setState(() => ({
                    users: self.state.users.slice().map(user => {
                        if (user.id === response.data.id) {
                            user.name = response.data.name;
                            user.email = response.data.email;
                            user.phone = response.data.phone;
                        }
                        return user;
                    })
                }));
            }).catch((e) => {
            console.log("user " + this.state.id + " wasn't updated")
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8081/API/users")
            .then(response => {
                this.setState({
                    users: response.data
                });
            }).catch(() => {
                this.setState({
                    users: []
                });
            console.log("users weren't fetched")
        });
    }

    render() {
        if (this.state === null || this.state.users === undefined)
            return null;

        return (
            <div className="App">
                <form ref="userForm">
                    <input type="text" id="user-name-input" ref="name" placeholder="name (is used for update)"/>
                    <input type="text" id="user-email-input" ref="email" placeholder="email"/>
                    <input type="text" id="user-email-phone" ref="phone" placeholder="phone"/>
                    <button onClick={this.createUser}>Add user</button>
                    <button onClick={this.updateUser}>Send user for update</button>
                </form>

                {this.state.users.map((user => {
                    return <User key={user.id} user={user}/>
                }))}

            </div>
        );
    }
}

export default App;
