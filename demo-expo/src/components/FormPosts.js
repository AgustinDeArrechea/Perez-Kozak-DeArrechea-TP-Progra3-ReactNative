import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class FormPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      error: "",
    };
  }

  crearPosts(datos) {
    if (datos !== "") {
      db.collection("posts")
        .add({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          posts: datos, // No puede ser vacio datos porque sino crashea
        })
        .then((resp) => this.props.nav.navigate('TabNavigator',{screen: "Home"})) //Es un componente, no tiene las props de navegacon
        .catch((err) => console.log(err));
    }
  }
   
  render() {
   
    return (

      <View>
        
        <Text>Publica tu Post para que todos vean donde estas!</Text>
        
        <View>
          <TextInput
            keyboardType="default"
            placeholder="Escrube tu Post"
            onChangeText={(text) => this.setState({ posts: text })}
            value={this.state.posts}
          />

          <Pressable onPress={() => this.crearPosts(this.state.posts)}>
            <Text>Crear Post</Text>
          </Pressable>
        </View>{" "}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default FormPosts;