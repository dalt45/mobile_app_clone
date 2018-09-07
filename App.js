/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './src/components/login/Login';
import SignUp from './src/components/signup/SignUp';
import StreamerList from './src/components/streamers/StreamerList'


const MainStack = createStackNavigator({
  HomeLogin: {
    screen:Login,
  },
  StreamerMain:{
    screen: StreamerList,
  },
},
{
initialRouteName:'HomeLogin',
headerMode:'screen',
}
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen:MainStack,
    },
    MyModal:{
      screen:SignUp,
    },
  },
  {
    mode:'modal',
    headerMode:'screen',
  }
);
  


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }

  render() {
    return <RootStack />
  }
}

export default App