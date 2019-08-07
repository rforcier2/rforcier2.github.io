import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shiftRef } from '../firebase';

import ShiftItem from './ShiftItem';
import { availableShifts } from '../actions';

class ShiftList extends Component {

  componentDidMount() {
    shiftRef.on('value', snap => {
      let shifts = [];
      snap.forEach(shift => {
        const {email, date, beginTime, endTime, fullName, jobClass, meal, notes, offerSwap, pNumber, signed} = shift.val();
        const serverKey = shift.key;
        shifts.push({email, date, beginTime, endTime, fullName, jobClass, meal, notes, offerSwap, pNumber, signed, serverKey});
      })
      this.props.availableShifts(shifts);
    })
  }

  render() {
    console.log('this.props.shifts', this.props.shifts);
    return (
      <div>
        <h2 className="text-white mt-5 mb-2"> Available Shifts:</h2>
        <div className="card-deck mt-3">
        {
          this.props.shifts.map( (shift, index) => {
            return (
              <ShiftItem key={index} shift={shift} />
            )
          })
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { shifts } = state;
  return {
    shifts
  }
}

export default connect(mapStateToProps, { availableShifts })(ShiftList);
