import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Welcome from './components/Welcome'
import counterReducer from './reducers/counterReducer'
const store = createStore(counterReducer)
class App extends React.Component{
render(){
      return (
        <Provider store={store}>
           <Welcome />
        </Provider>
    );
  }
}
export default App;