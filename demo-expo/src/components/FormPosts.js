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

  crearPosteo() {
    const { texto } = this.state;

    if (texto.trim() === "") {
      this.setState({ error: "El post no puede estar vacío" });
      return;
    }

    // Crear el post en la colección "posts"
    db.collection("posts")
      .add({
        texto: texto,
        createdAt: Date.now(),
        owner: auth.currentUser.email,
        likes: [], // Inicialmente vacío
      })
      .then(() => {
        this.setState({ texto: "", error: "" });
        alert("Post creado con éxito");
        this.props.nav.navigate("Home"); // Navegar a la pantalla Home
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: "Hubo un error al crear el post" });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear un nuevo post</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu post aquí..."
          multiline
          numberOfLines={4}
          onChangeText={(text) => this.setState({ texto: text })}
          value={this.state.texto}
        />
        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
        <Pressable style={styles.button} onPress={() => this.crearPosteo()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>
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