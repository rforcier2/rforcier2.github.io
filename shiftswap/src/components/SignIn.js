import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

import "../App.css";




class SignIn extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      dept: 'Customer Service',
      jobClass: '',
      username: '',
      email:    '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn(){
      console.log('this.state: ', this.state);
      const {email, password } = this.state;
      firebaseApp.auth().signInWithEmailAndPassword(email, password)

      .catch(error => {
        console.log('error: ', error);
        this.setState({error})
      })
  }

  render() {


    return (
      <div className="container App-header">
        <h2 className="my-3">Sign In</h2>
        <div className="alert">{this.state.error.message}</div>
        <div> <Link to={'/signup'}>Don't have an account? Sign up</Link></div>
        <form className="">
        <div className="form-group">
          <input
            className="form-control mx-2 my-2"
            type="text"
            placeholder="Email"
            onChange={event => this.setState({email: event.target.value})}
          />
          <input
            className="form-control mx-2 my-2"
            type="password"
            placeholder="password"
            onChange={event => this.setState({password: event.target.value})}
          />
          <button
            className="btn btn-success mx-2"
            type="button"
            onClick={()=>this.signIn()}>
            Sign In
          </button>
        </div>
        </form>
      </div>
    );
  }
}


export default SignIn;
