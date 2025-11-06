import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from '@expo/vector-icons/Entypo';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator()

class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />
        <Tab.Screen name='NewPost' component={NewPost} options={{headerShown: false}}/>
        <Tab.Screen name='Profile' component={Profile} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="black" />}}/>
      </Tab.Navigator>
    )
  }
}

export default TabNavigator