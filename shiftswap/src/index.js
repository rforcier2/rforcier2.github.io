import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import { logUser } from './actions';
import reducer from './reducers';
import './index.css';


import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Shifts from './components/Shifts';
import AvailableShifts from './components/AvailableShifts';
import TakenShifts from './components/TakenShifts';

import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(
  user => {
    if (user){
      const { email } = user;
      store.dispatch(logUser(email));
      browserHistory.push('/app')
    }
    else{
      browserHistory.replace('/login')
    }
  }
)

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history ={ browserHistory }>
      <Route path="/app" component={App}/>
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp}/>
      <Route path="/shifts" component={Shifts}/>
      <Route path="/availableShifts" component={AvailableShifts}/>
      <Route path="/takenShifts" component={TakenShifts} />
    </Router>
  </Provider>,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
