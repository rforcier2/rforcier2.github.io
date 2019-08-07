import { AVAILABLE_SHIFTS } from '../constants';

export default (state = [], action) => {
  switch(action.type) {
    case AVAILABLE_SHIFTS:
      const { shifts } = action;
      return shifts;

    default:
      return state;
  }
}
