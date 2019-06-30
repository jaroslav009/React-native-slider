/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import WrapSlider from './components/Slider/WrapSlider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RegisterDataUser from './components/Register/RegisterDataUser';
import Dashboard from './components/Dashboard/Dashboard';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profie';
import Quiz from './components/Quiz/Quiz';
import QuizItem from './components/Quiz/QuizItem';
import Slack from './components/Slack/Slack';
import About from './components/About/About';
import Settings from './components/Settings/Settings';
import ProfileStudents from './components/Profile/ProfileStudents';
import QuizShowProfile from './components/Quiz/QuizShowProfile';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Header from './components/Header/Header'
const AppNavigator = createStackNavigator({
    Header: {screen: Header},
    Dashboard: {screen: Dashboard},
    Leaderboard: {screen: Leaderboard},
    Profile: {screen: Profile},
    Quiz: {screen: Quiz},
    QuizItem: {screen: QuizItem},
    Slack: {screen: Slack},
    About: {screen: About},
    Settings: {screen : Settings},
    WrapSlider: {screen : WrapSlider},
    Login: {screen : Login},
    Register: {screen : Register},
    RegisterDataUser: {screen : RegisterDataUser},
    ProfileStudents: {screen : ProfileStudents},
    QuizShowProfile: {screen : QuizShowProfile},
    ResetPassword: {screen : ResetPassword}
  },
  {
    initialRouteName: 'WrapSlider',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  
  render() {
    
      return (
          <AppContainer />
      );
  }

}
