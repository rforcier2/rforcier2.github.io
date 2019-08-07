import { SIGNED_IN, AVAILABLE_SHIFTS, TAKEN_SHIFTS } from '../constants';

export function logUser(email){
   const action = {
     type: SIGNED_IN,
     email
   }
   return action;
}

export function availableShifts(shifts){
  const action = {
    type: AVAILABLE_SHIFTS,
    shifts
  }
  return action;
}

export function shiftTaken(takenShifts){
  const action = {
    type: TAKEN_SHIFTS,
    takenShifts
  }
  return action;
}
