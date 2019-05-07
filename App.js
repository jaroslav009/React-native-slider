/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import WrapSlider from './components/Slider/WrapSlider';
import Login from './components/Login/Login';

export default class App extends Component {
  
  render() {
      return (
        <View>
          {/* <WrapSlider /> */}
          <Login />
        </View>
      );
  }

}