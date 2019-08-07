import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import { userRef } from '../firebase';
import "../App.css";

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:    '',
      password: '',
      username: '',
      error: {
        message: ''
      }
    }
  }

  signUp(){
      console.log('this.state: ', this.state);
      const { email, password, username } = this.state;
      userRef.push({ email, username });

      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(x => console.log(x))
      .catch(error => {
        console.log('error: ', error);
        this.setState({error})
      })
  }

  render() {
    // const { dept } = this.state;
    // const jobClassDictionary = [
    //   {
    //     department: 'Customer Service',
    //     jobs: ['Bagger', 'Cashier', 'CSS'],
    //   },
    //   // {
    //   //   department: 'Meat',
    //   //   jobs: ['Seafood', 'Cutter Apprentice', 'Meat Cutter'],
    //   // }
    // ]
    //
    // const getJobs = () => {
    //
    //     const currentJob = jobClassDictionary.filter( ({department} ) => department === dept)[0]
    //     return (
    //       <select
    //         className="form-control mx-2 my-2"
    //         onChange = { event => this.setState({jobClass: event.target.value})}
    //         >
    //         { currentJob.jobs.map( jobTitle => <option value={jobTitle}>{jobTitle}</option>)}
    //       </select>
    //     )
    // }

    return (
      <div className="container App-header">
        <h2 className="my-3">SignUp</h2>
        <div className="alert">{this.state.error.message}</div>
        <div> <Link to={'/login'}>Already a user? Login instead</Link></div>
        <form className="">
         <div className="form-group">

          <input
            className="form-control mx-2 my-2"
            type="text"
            placeholder="username"
            onChange={event => this.setState({username: event.target.value})}
          />

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
            onClick={()=>this.signUp()}>
            Sign Up
          </button>
        </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {user} = state;
  return{
    user
  }
}

export default connect(mapStateToProps, null)(SignUp);
