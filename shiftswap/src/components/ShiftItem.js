import React, { Component } from 'react';
import { connect } from 'react-redux';
import { takenShiftRef, shiftRef } from '../firebase';
// userRef from firebase
class ShiftItem extends Component {

  takeShift(){
    // add to taken shifts
    // remove from shift ref
    const {email} = this.props.user;
    const {date, beginTime, endTime, fullName, jobClass, serverKey} = this.props.shift;
    //console.log("email: ", email, "Name: ", fullName, "Key: ", serverKey);
    shiftRef.child(serverKey).remove();
    takenShiftRef.push({email, date, beginTime, jobClass, endTime, fullName, serverKey})

  }

  render() {
    const { beginTime, endTime, date, fullName, jobClass, meal, notes, offerSwap } = this.props.shift;
    // const email, pNumber, signed unused;;
    return (
      <div className="card text-white bg-transparent border-success mb-3" style={{maxWidth: '18rem', minWidth: '18rem'}}>
        <div className="card-header border-success lead">
          <strong>Date: {date}</strong>
        </div>
        <div className="card-body border-success text-white" style={{background: '#222'}}>
          <h5 className="card-title">Job: {jobClass}</h5>
          <p className="card-text">
           <strong>Posted By: {fullName}</strong>
           <br />
           Shift Begin: {beginTime}
           <br />
           Shift End: {endTime}
           <br />
           Shift Length: {parseInt(endTime) - parseInt(beginTime)} hours
           <br />
           Meal: {meal}
           <br />
           Swap Offered: {offerSwap}
           <br />
           Shift Notes: {notes}
          </p>
        </div>
        <div className="card-footer border-success">
          <button
          className="btn btn-success"
          onClick = { ()=> this.takeShift() }
          >Take This Shift</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(ShiftItem);
