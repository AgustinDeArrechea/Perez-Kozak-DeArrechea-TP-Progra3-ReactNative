import React, { Component } from 'react'; // Importa React y Component
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa el creador de stack navigator
import Home from '../screens/Home'; // Importa la pantalla Home
import Comments from '../screens/Comments'; // Importa la pantalla Comments

const Stack = createNativeStackNavigator(); // Crea una instancia del stack navigator

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
