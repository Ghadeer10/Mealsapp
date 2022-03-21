import React from 'react';
import type { Node } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import mealsReducer from './store/reducers/mealsReducer';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const App: () => Node = () => {

  return (

    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );

};

const styles = StyleSheet.create({
  f: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
