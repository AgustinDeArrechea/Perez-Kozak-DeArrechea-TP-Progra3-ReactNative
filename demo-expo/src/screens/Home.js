import { View, Text, Pressable, StyleSheet, FlatList } from "react-native"; // Importo los componentes necesarios desde react-native
import React, { Component } from 'react' // Importo Component desde react
import { db, auth } from "../firebase/config"; // Importo la base de datos y la autenticación desde la configuración de Firebase
import PostHome from "../components/PostHome"; // Importo el componente PostHome para mostrar cada post en la lista

 class Home extends Component { // Defino la clase Home que extiende de Component 
   constructor(props) { // constructor que recibe props del componente padre
    super(props); // Llamo al constructor de la clase componente padre
    this.state = { // Defino el estado inicial del componente
      postsRecuperados: [], // Array vacío para almacenar los posts recuperados de la base de datos
    };
  }

   componentDidMount() { // Método del ciclo de vida que se ejecuta después de que el componente se monta
    db.collection("posts").orderBy('createdAt', 'desc').onSnapshot((docs) => { // Escucho en tiempo real la colección "posts" ordenada por fecha de creación descendente
      let postsDocs = []; // Array temporal para almacenar los posts recuperados
      docs.forEach((doc) => { // Recorro cada documento recuperado
        postsDocs.push({ // Agrego un objeto con el id y los datos del post al array temporal
          id: doc.id, // ID del documento
          data: doc.data(), // Datos del documento
        });
      });

      // Hago un Set State aca  porque al ser sincronico, no avanza el codigo en la siguiente liena hasta que el bloque anterior no termine de procesarse
      this.setState({ // Actualizo el estado del componente
        postsRecuperados: postsDocs, // Actualizo el estado con los posts recuperados
      });
    });
  }


  render() { // 
    console.log('Post Recuperados',this.state.postsRecuperados); // Muestro en consola los posts recuperados
    
    return ( 
      <View style={styles.container}> {/* Contenedor principal del componente */}
        <Text style={styles.title}>Posts del día</Text> {/* Título de la pantalla */}

        <FlatList // Componente para renderizar los posts en una lista
          style={styles.list} // Estilo de la lista
          data={this.state.postsRecuperados} // Datos de la lista, que son los posts recuperados del estado
          keyExtractor={(item) => item.id.toString()} // Función para extraer la clave única de cada ítem en la lista
          renderItem={({ item }) => ( // Función para renderizar cada ítem en la lista
            <PostHome // Componente PostHome para mostrar cada post
              nav={this.props.navigation} // Paso la navegación como prop para poder navegar desde el componente PostHome
              postId={item.id} // Paso el ID del post como prop
              data={item.data} // Paso los datos del post como prop
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({ // Defino los estilos del componente
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0b3b5c',
    marginVertical: 8,
    paddingLeft: 12,
    textAlign: 'left'
  }
})

export default Home // Exporto el componente Home para usarlo en otras partes de la aplicación