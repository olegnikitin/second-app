import React, {Component} from 'react';
import axios from 'axios';
import User from './model/User';

class App extends Component {

    constructor(props) {
        super(props);

        this.createUser = this.createUser.bind(this);
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
                self.setState((prevState, props) => ({
                    users: prevState.users.slice().push(response.data)
                }));
            }).catch(() => {
                console.log("user wasn't created")
        });

        this.refs.userForm.reset();
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
                    <input type="text" id="user-name-input" ref="name" placeholder="name"/>
                    <input type="text" id="user-email-input" ref="email" placeholder="email"/>
                    <input type="text" id="user-email-phone" ref="phone" placeholder="phone"/>
                    <button onClick={this.createUser}>Add user</button>
                </form>

                {this.state.users.map((user => {
                    return <User key={user.id} user={user}/>
                }))}

            </div>
        );
    }
}

export default App;
