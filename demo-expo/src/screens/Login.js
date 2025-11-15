import { Text, View, TextInput, Pressable, StyleSheet } from "react-native"; 
import React, { Component } from "react"; //  importo Component 
import { db, auth } from "../firebase/config"; // importo la configuración de firebase

class Login extends Component { // creo la clase Login que extiende de Component
  constructor(props) { // el constructor recibe las props
    super(props); // llamo al constructor de la clase padre
    this.state = { // inicializo el estado
      email: "", // el usuario ingresa el email
      password: "", // el usuario ingresa la contraseña
      error: "", // para mostrar errores de autenticación
    }; // todo esto gurada lo que el usuario escribe y los posibles mensajes de error 
  }

  componentDidMount() { 
    this.remember = auth.onAuthStateChanged(user => { // escucho los cambios en el estado de autenticación del usuario
      if (user) { // si hay un usuario autenticado que existe, pasa lo siguiente
        this.props.navigation.navigate('TabNavigator') //Esto lleva al usuario desde la pantalla actual hacia la pantalla ‘TabNavigator’, que es donde estan las pestañas principales de la app
      };
    });
  }

  submit(email, password) { // valido el email y la contraseña ingresados por el usuario
    if (!email.includes("@")) { // si el email no contiene "@", muestro un error
      this.setState({ error: "El email debe contener @" }); // muestro el error por el @ que falta

      return;
    }
    if (password.length < 6) { // si la contraseña tiene menos de 6 caracteres, muestro un error
      this.setState({ error: "La contraseña debe tener mas de 6 caracteres " }); // muestro el error por la longitud de la contraseña
      return; 
    }

    auth // uso el servicio de autenticación de firebase
      .signInWithEmailAndPassword(email, password) // intento iniciar sesión con el email y la contraseña proporcionados
      .then((user) => {  // si la autenticación es exitosa, navego a la pantalla principal
        this.props.navigation.navigate("TabNavigator", { screen: "Home" });  // navego a la pantalla principal por ser exitosa la autenticación
      }) 
     .catch((err) => { // si hay un error durante la autenticación, lo manejo aquí
        let errorMessage = ""; // inicializo el mensaje de error vacío
        
        if (err.code === 'auth/internal-error') { // si el error es de tipo 'internal-error', muestra lo siguiente
          errorMessage = 'Error al iniciar sesión'; // mensaje genérico de error
        }
        
        this.setState({ error: errorMessage }, () => // actualizo el estado con el mensaje de error
          console.log("El error fue ", err) // imprimo el error en la consola para que el desarrollador lo vea
        );
      });
      
  }

  render() { // renderizo la interfaz de usuario
    return (
      <View style={styles.mainContainer}> {/* contenedor principal */}
        <Text style={styles.title}>Iniciar Sesion</Text> {/* muestra iniciar sesion */}

        <View style={styles.container}> {/* contenedor del formulario */}
          <TextInput // está para que el usuario ingrese su email
            keyboardType="email-address" // tipo de teclado para email
            style={styles.input} // aplica estilos al input de email
            onChangeText={(text) => this.setState({ email: text })} // actualiza el estado con el email ingresado
            value={this.state.email} // hace que el valor del input sea el estado email
            placeholder="Ingrese su Email" // hace que aparezca un texto de ingresar mail cuando la caja de input está vacía
          />
          <TextInput // está para que el usuario ingrese su contraseña
            keyboardType="default" // tipo de teclado para contraseña ,por defecto
            secureTextEntry={true} // oculta el texto ingresado para mayor seguridad en la contraseña
            style={styles.input} // aplica estilos al input de contraseña
            onChangeText={(text) => this.setState({ password: text })} // actualiza el estado con la contraseña ingresada 
            value={this.state.password} // hace que el valor del input sea el estado password
            placeholder="Ingrese su contraseña" // hace que aparezca un texto de ingresar contraseña cuando la caja de input está vacía
          />

          {this.state.error ? ( // si hay un error, lo muestra
            <Text style={styles.errorText}>{this.state.error}</Text> // muestra el mensaje de error
          ) : null} {/* si no hay error, no muestra nada */}

          {/* Iniciar Sesion */}
          <Pressable 
            style={styles.button} // botón para iniciar sesión
            onPress={() => this.submit(this.state.email, this.state.password)} // llama al método submit con el email y la contraseña del estado
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text> {/* texto del botón */}
          </Pressable> 

          {/* Ir a Register */}
          <Pressable 
            style={styles.secondaryButton} // botón secundario para ir a la pantalla de registro
            onPress={() => this.props.navigation.navigate("Register")} // navega a la pantalla de registro
          >
            <Text style={styles.secondaryButtonText}>No tengo cuenta</Text> {/* texto del botón secundario */}
          </Pressable>
        </View> 
      </View> 
    );
  }
}

const styles = StyleSheet.create({ // estilos para los componentes
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
    justifyContent: "flex-start", // Cambiado de 'center' a 'flex-start'
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginTop: -20, // Añadido para reducir el espacio después del título
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
  secondaryButton: {
    marginVertical: 5,
  },
  secondaryButtonText: {
    color: "#4a90e2",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30, // Reducido de 20
    color: "#333",
    textAlign: "center",
    width: "100%",
    marginTop: 60, // Ajustado para dar espacio desde la parte superior
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default Login; // exporto la clase Login para usarla en otras partes de la app
