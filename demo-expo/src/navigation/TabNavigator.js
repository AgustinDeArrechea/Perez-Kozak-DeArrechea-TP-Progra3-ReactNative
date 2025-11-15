import { Text, View } from 'react-native' 
import React, { Component } from 'react' // Importa Component desde React
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' // crea la navegacion entre pestañas
import Entypo from '@expo/vector-icons/Entypo'; // importa los iconos de Entypo
import HomeStack from './HomeStack'; // importa el stack de la pantalla de inicio
import NewPost from '../screens/NewPost';// importa la pantalla para crear un post
import Profile from '../screens/Profile'; // importa la pantalla de perfil
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // importa los iconos de MaterialIcons

const Tab = createBottomTabNavigator() // crea el navegador entre pestañas    

class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator> {/* Define las pantallas del navegador de pestañas */}
        <Tab.Screen name='HomeTab' component={HomeStack} options={{headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />
        <Tab.Screen name='NewPost' component={NewPost} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" /> }} />
        <Tab.Screen name='Profile' component={Profile} options={{headerShown: false, tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="black" />}}/>
      </Tab.Navigator>
    )
  }
}

export default TabNavigator // exporta el componente TabNavigator para usarlo en otras partes de la app