import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { Component } from 'react'
import { db, auth } from "../firebase/config";
import PostHome from "../components/PostHome";

 class Home extends Component {
   constructor(props) {
    super(props);
    this.state = {
      postsRecuperados: [],
    };
  }

   componentDidMount() {
    db.collection("posts").orderBy('createdAt', 'desc').onSnapshot((docs) => {
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
    console.log('Post Recuperados',this.state.postsRecuperados);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Posts del día</Text>

        <FlatList
          style={styles.list}
          data={this.state.postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostHome
              nav={this.props.navigation}
              postId={item.id}
              data={item.data}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

export default Home