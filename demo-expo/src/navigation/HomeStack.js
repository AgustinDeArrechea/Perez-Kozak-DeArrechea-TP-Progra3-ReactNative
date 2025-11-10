import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

export default class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Comments" component={Comments} options={{ title: 'Comentarios' }} />
      </Stack.Navigator>
    );
  }
}
