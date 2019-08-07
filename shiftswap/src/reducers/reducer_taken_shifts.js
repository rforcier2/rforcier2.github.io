import { TAKEN_SHIFTS } from '../constants';

export default (state=[], action) => {

  switch(action.type){
    case TAKEN_SHIFTS:
      const {takenShifts} = action;
      return takenShifts;
    default:
      return state;
  }
  
}
