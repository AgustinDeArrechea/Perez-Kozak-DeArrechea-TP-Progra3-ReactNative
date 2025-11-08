import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db,auth } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: "",
    };
  }

  submit(username, email, password) {
    // En caso de que no incluya el arroba hace esto
    if (!email.includes("@")) {
      this.setState({ error: "El email debe contener @" });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: "La contrasena debe tener mas de 6 caracteres" });
      return;
    }

    if (username.length === 0) {
      this.setState({ error: "Completar Nombre" });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection("users").add({
          owner: email,
          username: username,
          createdAt: Date.now(),
        });
      })
      .then(() => this.props.navigation.navigate("Login"))
      .catch((err) =>
        this.setState({ error: err.message }, () =>
          console.log("El error fue ", err)
        )
      );
  }

  render() {
        console.log("el error del usuario en el registro es", this.state.error);

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register</Text>

          <TextInput
            keyboardType="default"
            style={styles.input}
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
            placeholder="Nombre"
          />

          <TextInput
            keyboardType="default"
            style={styles.input}
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            placeholder="Email"
          />

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder="Password"
          />

          {this.state.error ? (
            <Text style={styles.errorText}>{this.state.error}</Text>
          ) : null}

          <Pressable
            style={styles.button}
            onPress={() =>
              this.submit(
                this.state.username,
                this.state.email,
                this.state.password
              )
            }
          >
            <Text style={styles.buttonText}>Enviar Registro</Text>
          </Pressable>

          <Pressable
                      style={styles.secondaryButton}
                      onPress={() => this.props.navigation.navigate("Login")}
                    >
                      <Text style={styles.secondaryButtonText}>Iniciar Sesion</Text>
                    </Pressable>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: "90%",
    fontSize: 16,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },secondaryButton: {
    marginVertical: 5,
  },
  secondaryButtonText: {
    color: "#4a90e2",
    fontSize: 14,
  }
});

export default Register;
