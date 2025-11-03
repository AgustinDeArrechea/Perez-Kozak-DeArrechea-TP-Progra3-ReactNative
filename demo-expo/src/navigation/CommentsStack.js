import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()

class StackNavigator extends Component {
  render() {
    return (
      <StackNavigator>
        {/* Home */}
        <Stack.Screen/> 
        {/* Commnets */}
        <Stack.Screen/>

      </StackNavigator>
    )
  }
}

export default StackNavigator