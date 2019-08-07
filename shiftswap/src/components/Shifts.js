import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import { Navbar, Nav, Form } from 'react-bootstrap';
import AddShift from './AddShift';
import '../App.css';


class Shifts extends Component {
  signOut(){
    firebaseApp.auth().signOut();
  }

  render() {
    const {email} = this.props.user;
    return (
      <div className="App bg-dark py-5">

      <Navbar expand="md" style={{background: '#282c44'}} className="fixed-top">
        <Navbar.Brand><Link to={'/app'} className="text-white pointer">Publix 332 Shift Board</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="my-1 text-success pointer" to={'/Shifts'} >Post A Shift</Link>
              <Link className="my-1 ml-3 text-white pointer" to={'AvailableShifts'}>Available Shifts</Link>
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

        <div className="text-center bg-dark container-fluid text-white px-5 py-3 mb-0 mt-5">
          <h1>Post Your Shift</h1>
        </div>
        <div className="col-md-12 text-center shiftContent mb-2 mt-2 content bg-dark container-fluid pt-5">
          <div id="success" className="success alert alert-success text-center">
            You have posted your shift to the board!
          </div>
          <div className="col-sm-12 row">
            <div className="col-sm-3"></div>
            <div id="error" className="col-sm-6 error alert alert-danger text-center">
          </div>
          </div>
          <div className="col-sm-12 px-0 mb-4 mt-0 row">
            <div className="col-sm-3"></div>
            <AddShift id="addShift" className="col-sm-6 mt-0 mb-3 px-0" />
          </div>
        </div>
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
export default connect(mapStateToProps, null)(Shifts);
