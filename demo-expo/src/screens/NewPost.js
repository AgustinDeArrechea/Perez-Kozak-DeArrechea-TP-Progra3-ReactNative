import { Text, View, Pressable, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
import FormPosts from '../components/FormPosts'

class NewPost extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Crear Nuevo Post</Text>
        <FormPosts nav={this.props.navigation}/>
      </View>
    )
  }
}

// Estilo para el título
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#1976d2",
  },
});

export default NewPost