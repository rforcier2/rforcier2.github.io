import { combineReducers } from 'redux';
import user from './reducer_user';
import shifts from './reducer_shifts';
import takenShifts from './reducer_taken_shifts';

export default combineReducers({
  user,
  shifts,
  takenShifts
})
