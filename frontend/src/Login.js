import React from 'react';
import axios from 'axios';
import './login.css';
import logo from './logo.JPG';

class Login extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            name: ''
        };

        this.submitLogin = this.submitLogin.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setName = this.setName.bind(this);

        console.log('IN CONSTUCTOR!')
    }

    async submitLogin() {
        //do log-in stuff here...
        console.log("username: ", this.state.username, ", password: ", this.state.password);
        
        await axios.post('https://diversify-server.herokuapp.com/api/login', {
            username: this.state.username,
            password: this.state.password,
        }).then(() => {
            // alert("Log in successful!");
            window.open(`/welcome`);
        }).catch((err) => {
            alert("Log in failed!");
            console.log(err);
        });

        // axios.get('https://diversify-app.herokuapp.com/api/current-user')
        // .then((res) => {
        //     // alert(JSON.parse(res.data.data).email + " logged in!");
        //     window.open(`/welcome`);
        // }).catch((err) => {
        //     alert("Get current user failed!");
        //     console.log(err);
        // });
    }

    async submitSignUp() {
        console.log("username: ", this.state.username, ", password: ", this.state.password, ", name: ", this.state.name);
        
        await axios.post('https://diversify-server.herokuapp.com/api/signup', {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        }).then(() => {
            alert("Sign up successful!");
            this.submitLogin();
        }).catch((err) => {
            alert("Sign up failed!");
            console.log(err);
        });
    }

    setUsername(event) {
        this.state.username = event.target.value;
    }

    setPassword(event) {
        this.state.password = event.target.value;
    }

    setName(event) {
        this.state.name = event.target.value;
    }

    render() {
        return (
            <div className="login-body">
                <img className="logo" src={logo}/>
                <h1 className="login-header"> Login </h1>
                <div className="login-form">
                    <form>
                        <label for="username">Email</label> 
                        <br/>
                        <input type="text" id="username" name="username" size="70" onChange={this.setUsername}></input>
                        <br/> <br/>
                        <label for="fname">Password (at least 6 characters)</label> 
                        <br/>
                        <input type="password" id="fname" name="fname" size="70" onChange={this.setPassword}></input>
                        <br/> <br/>
                        <label for="name">Name (sign up only)</label> 
                        <br/>
                        <input type="text" id="name" name="name" size="70" onChange={this.setName}></input>
                        <br/>
                    </form>
                </div>
                <div className="login-submit-container">
                <br/> <br/>
                    <button className="login-submit" onClick={() => this.submitLogin()}> Log In </button>
                    <button className="login-submit" onClick={() => this.submitSignUp()}> Sign Up </button>
                </div>
            </div>
        )
    }
    
}

export default Login;