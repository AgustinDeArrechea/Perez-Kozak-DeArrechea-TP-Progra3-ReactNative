import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class FormPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      error: "",
    };
  }

  crearPosts(datos) {
    db.collection("users")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let usersDocs = [];
        docs.forEach((doc) => {
          usersDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        if (datos !== "" && usersDocs.length > 0) {
          db.collection("posts")
            .add({
              owner: auth.currentUser.email,
              username: usersDocs[0].data.username,
              createdAt: Date.now(),
              posts: datos, // No puede ser vacio datos porque sino crashea
              likes: [],
            })
            .then((resp) => {
              this.setState({ posts: "", error: "" }); // Limpiar el campo y el error después de publicar
              this.props.nav.navigate("HomeTab");
            }) //Es un componente, no tiene las props de navegacon
            .catch((err) => {
              console.error(err);
              this.setState({ error: "Hubo un error al crear el post" });
            });
        } else if (datos === "") {
          this.setState({ error: "El post no puede estar vacío" });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            keyboardType="default"
            placeholder="Escrbe tu Post"
            onChangeText={(text) => this.setState({ posts: text })}
            value={this.state.posts}
            style={styles.input}
          />
          {this.state.error ? (
            <Text style={styles.errorText}>{this.state.error}</Text>
          ) : null}
          <Pressable
            style={styles.button}
            onPress={() => this.crearPosts(this.state.posts)}
          >
            <Text style={styles.buttonText}>Publicar Post</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

// Estilos agregados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%", // asegura que ocupe toda la pantalla
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center", // centrado horizontal
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fafafa",
    width: "90%", // ancho relativo para centrar
  },
  button: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "90%", // ancho relativo para centrar
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default FormPosts;
