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
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profie';
import Quiz from './components/Quiz/Quiz';
import QuizItem from './components/Quiz/QuizItem';
import Slack from './components/Slack/Slack';
import About from './components/About/About';
import Settings from './components/Settings/Settings';

export default class App extends Component {
  
  render() {
      return (
        <View>
          {/* <WrapSlider /> */}
          {/* <Login /> */}
          {/* <Register /> */}
          {/* <Dashboard /> */}
          {/* <Leaderboard /> */}
          {/* <Profile /> */}
          {/* <Quiz /> */}
          {/* <QuizItem /> */}
          {/* <Slack /> */}
          {/* <About /> */}
          <Settings />
        </View>
      );
  }

}