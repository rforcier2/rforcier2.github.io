import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { shiftRef } from '../firebase';


class AddShift extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      jobClass: '',
      fullName: '',
      pNumber: '',
      beginTime: '',
      endTime: '',
      date: '',
      meal: '',
      offerSwap: '',
      notes: '',
      signed: ''
    }
  }

  handleChange(e){
    const error = document.getElementById("error");
    let errorMessage = "",
        thisId = e.target.id,
        thisValue = e.target.value;
        console.log("ID: ", thisId, "thisValue: ", thisValue);
        console.log('state:=> ', this.state);


    if(thisValue === "" || !thisValue){
      document.getElementById(thisId).style.border = "4px solid red";
      error.style.display = "block";
      errorMessage = "Please fill in ALL FIELDS";
      error.innerHTML = errorMessage;
    }
    else {
      document.getElementById(thisId).style.border = "4px solid green";
      return this.setState({[thisId]: thisValue})
    }
  }


  changeSignature() {
    var signedCheck = document.getElementById("signedCheck");

    if (signedCheck.checked) {
      this.setState({signed: 'SIGNED'})
    }
    else {
      this.setState({signed: 'NOT SIGNED'})
     }
   }


  addShift(){
    //let errorMessage = "";
    const { fullName, pNumber, jobClass, beginTime, endTime, date, meal, offerSwap, notes, signed } = this.state;
    const { email } = this.props.user;
    const pattern = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;
    var fields = [];
    var fullNameField = document.getElementById("fullName"),
        pNumberField = document.getElementById("pNumber"),
        jobClassField = document.getElementById("jobClass"),
        beginTimeField = document.getElementById("beginTime"),
        endTimeField = document.getElementById("endTime"),
        dateField = document.getElementById("date"),
        mealField = document.getElementById("meal"),
        offerSwapField = document.getElementById("offerSwap"),
        notesField = document.getElementById("notes"),
        // signedCheckField = document.getElementById("signedCheck"),
        error = document.getElementById("error"),
        success = document.getElementById("success");

        fields.push(fullNameField, pNumberField, jobClassField, beginTimeField, endTimeField, dateField, mealField, offerSwapField, notesField);
        for(let each of fields){
          if(each.value === "" || pattern.test(each.value) === true){
            success.style.display="none";
            error.style.display="block";
            error.innerHTML = "Please fill in all fields appropriately";
            return false;
          }

          if (each.value === "NOT SIGNED"){
            success.style.display="none";
            error.style.display="block";
            error.innerHTML = "You must e-sign by clicking the check box!";
            return false;
          }
        }

        if( parseInt(endTimeField.value) - parseInt(beginTimeField.value) <= 0){
          success.style.display="none";
          error.style.display="block";
          error.innerHTML = "Please enter a valid Begin and End Time for your shift";
          beginTimeField.style.border = "2px solid red";
          endTimeField.style.border = "2px solid red";
          return false;
        }

        success.style.display="block";
        error.style.display="none";

        shiftRef.push({email, fullName, pNumber, jobClass, beginTime, endTime, date, meal, offerSwap, notes, signed })


        for(let field of fields){
          field.value = "";
          field.style.border="none";
        }

    }



  render(){
    return (
      <div id="shiftForm" className="form col-md-6 rounded pl-5 py-3">
        <h2 className="text-white">Add A Shift: </h2>


        <div className="form-group my-2">
          <span className="form-text text-white my-1">Select the date of your shift offer:</span>
          <input
            id="date"
            type="date"
            placeholder="Shift Date"
            className="form-control col-md-6"
            onChange={this.handleChange.bind(this)}
          />
        </div>

        <div className="form-group my-2">
          <span className="form-text text-white my-1">Select the job class:</span>
          <select
          id="jobClass"
          className="form-control col-md-6"
          onChange={this.handleChange.bind(this)}
          >
            <option>Bagger</option>
            <option>Cashier</option>
            <option>CSS</option>
          </select>
        </div>

          <div className="form-group my-2">
            <span className="form-text text-white my-1">Shift Begins At:</span>
            <input
              id="beginTime"
              type="time"
              placeholder="Shift time"
              className="form-control col-md-6"
              onChange={this.handleChange.bind(this)}
            />
          </div>

            <div className="form-group my-2">
            <span className="form-text text-white my-1">Shift Ends At:</span>
              <input
                id="endTime"
                type="time"
                placeholder="Selec"
                className="form-control col-md-6"
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="form-group my-2">
            <span className="form-text text-white my-1">Break?</span>
              <input
                id="meal"
                type="text"
                placeholder="Is there a break? Y or N"
                className="form-control col-md-6"
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="form-group my-2">
            <span className="form-text text-white my-1">Are you offering a swap?</span>
              <input
                id="offerSwap"
                type="text"
                placeholder="Swap Offer? Y or N"
                className="form-control col-md-6"
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="form-group my-2">
            <span className="form-text text-white my-1">Any notes?</span>
              <input
                id="notes"
                type="text"
                placeholder="Shift Notes:"
                className="form-control col-md-6"
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="form-group my-2">
            <span className="form-text text-white my-1">Name:</span>
              <input
                id="fullName"
                type="text"
                placeholder="Camcorder Coxworthy"
                className="form-control col-md-6"
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="form-group my-2">
            <span className="form-text text-white my-1">Personnel Number:</span>
              <input
                id="pNumber"
                type="text"
                placeholder="p0123456"
                className="form-control col-md-6"
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                id="signedCheck"
                className="form-check-input"
                value="NOT SIGNED"
                onClick={ () => this.changeSignature() }
              />
              <label className="form-check-label text-white">
                By checking this box, you understand you will be giving the shift up.
              </label>
            </div>

          <button
            className="btn btn-success mx-2 my-2"
            type="button"
            onClick={ ()=> this.addShift()}
          >
            Submit Shift
          </button>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(AddShift);
