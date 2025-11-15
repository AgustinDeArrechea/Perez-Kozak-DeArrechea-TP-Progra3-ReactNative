import { Text, View, TextInput, Pressable, StyleSheet } from "react-native"; 
import React, { Component } from "react"; // Importa React y Component desde react
import { db,auth } from "../firebase/config"; // Importa las instancias de la base de datos y autenticación desde la configuración de Firebase

class Register extends Component { // Define la clase Register que extiende Component
  constructor(props) { // recibe las props del componente padre que es App.js
    super(props); // llama al constructor de la clase del componente padre
    this.state = { // define el estado inicial del componente
      username: "", // aca se guarda el nombre de usuario, lo escribe el usuario
      password: "", // aca se guarda la contraseña, lo escribe el usuario
      email: "", // aca se guarda el email, lo escribe el usuario
      error: "", // aca se guarda el mensaje de error, si es que hay alguno
    };
  }

  submit(username, email, password) { // función que se ejecuta al presionar el botón de enviar registro
    // En caso de que no incluya el arroba hace esto
    if (!email.includes("@")) { 
      this.setState({ error: "El email debe contener @" }); // actualiza el estado con el mensaje de error si no incluye @
      return;
    }

    if (password.length < 6) {  // si la contraseña tiene menos de 6 caracteres
      this.setState({ error: "La contrasena debe tener mas de 6 caracteres" }); // actualiza el estado con el mensaje de error
      return;
    }

    if (username.length === 0) { // si el nombre de usuario está vacío
      this.setState({ error: "Completar Nombre" }); // actualiza el estado con el mensaje de error
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password) // crea un nuevo usuario con el email y la contraseña pertenecientes al estado
      .then((user) => { // la función que se ejecuta si la promesa se cumple 
        db.collection("users").add({ // agrega un nuevo documento a la colección "users" en la base de datos
          owner: email, // guarda el email del usuario que saco del estado
          username: username, // guarda el nombre de usuario que saco del estado
          createdAt: Date.now(), // guarda la fecha de creación del usuario 
        });
      })
      .then(() => this.props.navigation.navigate("Login")) // navega a la pantalla de Login si el registro fue exitoso
      .catch((err) => // la función que se ejecuta si la promesa falla
        this.setState({ error: err.message }, () => // actualiza el estado con el mensaje de error
          console.log("El error fue ", err) // imprime el error en la consola
        )
      );
  }

  render() {
        console.log("el error del usuario en el registro es", this.state.error); // imprime el mensaje de error en la consola

    return ( 
      <View style={styles.container}>  {/*contenedor de la pantalla de registro*/ }
        <View style={styles.formContainer}> {/* contenedor del formulario de registro */ }
          <Text style={styles.title}>Register</Text> {/* título de la pantalla de registro */ }

          <TextInput // campo de texto para el nombre de usuario
            keyboardType="default" // tipo de teclado por defecto
            style={styles.input} // aplica los estilos definidos para el input
            onChangeText={(text) => this.setState({ username: text })} // actualiza el estado con el texto ingresado
            value={this.state.username} // valor del campo de texto sacado del estado
            placeholder="Nombre" // placeholder que se muestra cuando el campo está vacío
          />

          <TextInput // campo de texto para el email
            keyboardType="default" // tipo de teclado por defecto
            style={styles.input} // aplica los estilos definidos para el input
            onChangeText={(text) => this.setState({ email: text })} // actualiza el estado con el texto ingresado de email
            value={this.state.email} // valor del campo de texto sacado del estado
            placeholder="Email" // placeholder que se muestra cuando el campo está vacío
          />

          <TextInput // campo de texto para la contraseña
            keyboardType="default" // tipo de teclado por defecto
            style={styles.input} // aplica los estilos definidos para el input
            onChangeText={(text) => this.setState({ password: text })} // actualiza el estado con el texto ingresado de la contraseña
            value={this.state.password} // valor del campo de texto sacado del estado
            secureTextEntry={true} // oculta el texto de contraseña ingresado para mayor seguridad
            placeholder="Password" // placeholder que se muestra cuando el campo está vacío
          />

          {this.state.error ? ( // si hay un mensaje de error en el estado
            <Text style={styles.errorText}>{this.state.error}</Text> // muestra el mensaje de error con los estilos definidos
          ) : null} {/* si no hay error no muestra nada */ }

          <Pressable // botón para enviar el registro
            style={styles.button} // aplica los estilos definidos para el botón
            onPress={() => // cuando se presiona el botón
              this.submit( // llama a la función submit con los valores del estado
                this.state.username, // pasa el nombre de usuario escrito por el usuario
                this.state.email, // pasa el email escrito por el usuario
                this.state.password // pasa la contraseña escrita por el usuario
              )
            }
          >
            <Text style={styles.buttonText}>Enviar Registro</Text> {/* texto del botón con los estilos definidos */ }
          </Pressable> 

          <Pressable // botón secundario para navegar a la pantalla de Login
                      style={styles.secondaryButton} // aplica los estilos definidos para el botón secundario
                      onPress={() => this.props.navigation.navigate("Login")} // navega a la pantalla de Login cuando se presiona el botón
                    >
                      <Text style={styles.secondaryButtonText}>Iniciar Sesion</Text> {/* texto del botón secundario con los estilos definidos */ }
                    </Pressable>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({ // define los estilos para los componentes
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

export default Register; // exporta el componente Register para usarlo en otras partes de la app
