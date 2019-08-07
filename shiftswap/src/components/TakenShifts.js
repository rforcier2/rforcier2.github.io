/*
  Boiler Plate:
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import { Navbar, Nav, Form } from 'react-bootstrap';
/*
  Custom / Relevant JS files / CSS
*/
import '../App.css';
import TakenShiftList from './TakenShiftList';



class TakenShifts extends Component {
  signOut(){
    firebaseApp.auth().signOut();
  }

  render() {
    const { email } = this.props.user;
    return (
      <div className="App bg-dark py-5">

      <Navbar expand="md" style={{background: '#282c44'}} className="fixed-top">
        <Navbar.Brand><Link to={'/app'} className="text-white pointer">Publix 332 Shift Board</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="my-1 text-white pointer" to={'/Shifts'} >Post A Shift</Link>
              <Link className="my-1 ml-3 text-white pointer" to={'AvailableShifts'}>Available Shifts</Link>
              <Link className="my-1 text-success pointer ml-3" to={'/takenShifts'}>Taken Shifts</Link>
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

        <div className="main text-center bg-dark container-fluid text-white px-5 py-5 mb-5 mt-2">
          <h1>Taken Shifts:</h1>
            <div id="error" className=" col-sm-6 error alert alert-danger text-center">
            </div>
            <TakenShiftList />

          </div>
          <div className="container py-5 my-5"></div>
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
export default connect(mapStateToProps, null)(TakenShifts);
