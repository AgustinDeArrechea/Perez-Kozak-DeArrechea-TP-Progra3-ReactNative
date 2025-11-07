import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { Component } from 'react'
import { db, auth } from "../firebase/config";

 class Home extends Component {
   constructor(props) {
    super(props);
    this.state = {
      postsRecuperados: [],
    };
  }

   componentDidMount() {
    db.collection("posts").onSnapshot((docs) => {
      let postsDocs = [];
      docs.forEach((doc) => {
        postsDocs.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      // Hago un Set State aca  porque al ser sincronico, no avanza el codigo en la siguiente liena hasta que el bloque anterior no termine de procesarse
      this.setState({
        postsRecuperados: postsDocs,
      });
    });
  }


  render() {
    return (
      <View>
        <Text>Home</Text>

        <FlatList
         data={this.state.postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>Hola</Text>
          )}/>
      </View>
    )
  }
}

export default Home