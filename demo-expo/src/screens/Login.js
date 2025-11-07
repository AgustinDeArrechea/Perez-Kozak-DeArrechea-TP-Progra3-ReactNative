import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db,auth } from "../firebase/config";

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    submit(email,password){

        if ( !email.includes('@') ) {
          this.setState({error:'El email debe contener @'}) 
          return
        }
        if (password.length<6) {
          this.setState({error:'La contraseña debe tener mas de 6 caracteres '}) 
          return
        }



              auth.signInWithEmailAndPassword(email,password)
          .then((user) => {this.props.navigation.navigate('TabNavigator',{screen: "Home"})})
          .catch((err)=> this.setState({error: err.message}, () => console.log("el error fue",err)) 
           )
    }


  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Iniciar Sesion</Text>

        <View style={styles.container}>
            {/* Email */}
          <TextInput
            keyboardType="default"
            style={styles.input} 
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            placeholder="Ingrese su Email"
          />
          {/* Contrasena */}
          <TextInput 
            keyboardType='default'
            style={styles.input} 
            onChangeText={(text) => this.setState({password: text })} 
            value={this.state.password}
            placeholder='Ingrese su contraseña'
          />
          {/* Iniciar Sesion */}
          <Pressable 
            style={styles.button}
            onPress={()=> this.submit(this.state.email, this.state.password) }>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>
          
          {/* Ir a Register */}
          <Pressable 
            style={styles.secondaryButton}
            onPress={()=> this.props.navigation.navigate('Register')}>
            <Text style={styles.secondaryButtonText}>No tengo cuenta</Text>
          </Pressable>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: '90%',
    fontSize: 16,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // Cambiado de 'center' a 'flex-start'
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: -20, // Añadido para reducir el espacio después del título
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    marginVertical: 5,
  },
  secondaryButtonText: {
    color: '#4a90e2',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30, // Reducido de 20
    color: '#333',
    textAlign: 'center',
    width: '100%',
    marginTop: 60 // Ajustado para dar espacio desde la parte superior
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }
})

export default Login;
