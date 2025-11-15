import { Text, View } from 'react-native'
import React, { Component } from 'react' // importo un componente de react para crear clases
import { createNativeStackNavigator } from '@react-navigation/native-stack'  // importo el stack navigator para la navegación entre pantallas
import Login from '../screens/Login' // importo la pantalla de login
import Register from '../screens/Register' // importo la pantalla de registro
import TabNavigator from './TabNavigator' // importo el tab navigator para la navegación entre pestañas

const Stack = createNativeStackNavigator() // creo una instancia del stack navigator

class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator> {/*  defino las pantallas que tendrá el stack navigator */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }
}

export default StackNavigator // exporto el stack navigator para usarlo en otras partes de la app