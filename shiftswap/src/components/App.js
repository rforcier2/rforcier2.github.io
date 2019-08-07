import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import { Navbar, Nav, Form } from 'react-bootstrap';
import '../App.css';


class App extends Component {
  signOut(){
    firebaseApp.auth().signOut();
  }

  render() {
    const {email} = this.props.user;
    return (
      <div className="App bg-dark">
      <Navbar expand="md" className="fixed-top" style={{background: '#282c44'}}>
        <Navbar.Brand className="text-success pointer" to={'/app'}>Publix 332 Shift Board</Navbar.Brand>
        <Navbar.Toggle className="bg-success" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="my-1 text-white pointer" to={'/Shifts'}>Post A Shift</Link>
              <Link className="my-1 text-white pointer ml-3" to={'/AvailableShifts'}>Available Shifts</Link>
              <Link className="my-1 text-white pointer ml-3" to={'/takenShifts'}>Taken Shifts</Link>
              <span className="my-1 ml-5 text-white">Logged in as <em>{email}</em></span>
            </Nav>
            <Form inline>
            <button
              className="btn btn-danger mx-auto"
              onClick={() => this.signOut()}
            >Sign Out</button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <main className="App-header bg-dark">
          <img src={require("../img/pub_logo.png")} className="App-logo" alt="logo" />
          <p>
            Welcome to Publix 332 Shift Swap Board!
          </p>
          <p>
            Check out available shifts or post your own to the board!
          </p>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state){
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(App);
