import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shiftTaken } from '../actions';
import { takenShiftRef } from '../firebase';

class TakenShiftList extends Component{

  showButton(){
    let clearBtn = document.getElementById("clearAllButton");
    const user = this.props.user.email;
    user === 'admin@shiftswap.com' ? clearBtn.style.display= "block"
                                   : clearBtn.style.display="none";
  }

  componentDidMount(){
      takenShiftRef.on('value', snap => {
        let takenShifts = [];
        snap.forEach(takenShift => {
          const {email, date, beginTime, fullName, endTime, jobClass } = takenShift.val();
          takenShifts.push({email, date, beginTime, fullName, endTime, jobClass});
        })
        this.props.shiftTaken(takenShifts);
      })

    this.showButton();
  }




  clearCompleted(){
    const { email } = this.props.user;
    if(email === 'admin@shiftswap.com'){
      let result = window.confirm("ARE YOU SURE YOU WANT TO CLEAR ALL COMPLETED SHIFTS? THIS CANNOT BE UNDONE");
      if( result ){
        takenShiftRef.set([]);
      }
    } else {
      alert("You do not have access to this function");
    }
  }

  render() {

    console.log('props.taken', this.props.takenShifts )
    return (
      <div>
      <div className="card-deck">
        {
          this.props.takenShifts.map( (takenShift, index) => {
            const {email, date, beginTime, endTime, fullName} = takenShift;
            const currentDate = new Date().toLocaleDateString();
            return (
              <div className="card text-white bg-transparent border-success mb-3" style={{maxWidth: '18rem', minWidth: '18rem'}}>
                <div className="card-header border-success lead">
                  <strong>Shift Taken By {email} on {currentDate}</strong>
                </div>
                <div className="card-body border-success text-white" style={{background: '#222'}}>
                  <h5 className="card-title">Shift Date: {date}</h5>
                  <p className="card-text">
                   <strong>Posted By: {fullName}</strong>
                   <br />
                   Shift Begin: {beginTime}
                   <br />
                   Shift End: {endTime}
                   <br />
                   Estimated Length: {parseInt(endTime) - parseInt(beginTime)} hours
                  </p>
                </div>
              </div>
            )
          })
        }

      </div>
      <hr />
      <button
      id="clearAllButton"
      className="btn btn-lg btn-danger"
      onClick={() => this.clearCompleted()}
      >
      CLEAR ALL TAKEN SHIFTS
      </button>



      </div>
    )

  }
}

function mapStateToProps(state) {
  const { takenShifts, user } = state;
  return{
    takenShifts,
    user
  }
}

export default connect(mapStateToProps, {shiftTaken})(TakenShiftList);
