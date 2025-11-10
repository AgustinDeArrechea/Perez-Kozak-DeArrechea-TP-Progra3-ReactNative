import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { db, auth, firebase} from "../firebase/config";

export default class Comentarios extends Component {
  constructor(props){
    super(props);
    this.state = {
      post: "",
      owner: "",
      comentarios: [],
      comentario: "",
      error: "",
    };
  }

  componentDidMount(){
    const postId = this.props.route.params.postId || this.props.route.params.id;
    this.unsubPost = db
      .collection('posts')
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data() || {};
        this.setState({
          post: data.posts,
          owner: data.username || data.owner,
          comentarios: Array.isArray(data.comentarios) ? data.comentarios : [],
        });
      });
  }
  crearComentario() {
    if (this.state.comentario !== "") {
      const postId = this.props.route.params.postId || this.props.route.params.id; // 👈 igual que arriba
      db.collection("posts")
        .doc(postId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion({
            user: auth.currentUser?.email || 'anon',
            descripcion: this.state.comentario,
            createdAt: Date.now(),
          }),
        })
        .then(() => this.setState({ comentario: "" }))
        .catch((err) => console.log(err));
    }
  }
  

    
  crearComentario() {
    if (this.state.comentario !== "") {
        const postId = this.props.route.params.postId || this.props.route.params.id;
        db.collection("posts")
          .doc(postId)
          .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                user: auth.currentUser.email,
              descripcion: this.state.comentario,
                createdAt: Date.now(),
            }),
          })
          .then((resp) => this.setState({ comentario: ""}))
            .catch((err) => console.log(err));
        }
    }

        render() {
            return (
                <View style={styles1.container}>
                    <Text style={styles1.title}>Post</Text>
                    <View style={styles1.post}>
                        <Text style={styles1.postText}>{this.state.owner}</Text>
                        <Text style={styles1.postText}>{this.state.post}</Text>
                    </View>
        
                    <Text style={styles1.title}>Comentarios</Text>
                    {this.state.comentarios.length != 0 ?
                        <FlatList style={styles1.flatList} data={this.state.comentarios} keyExtractor={(item, idx) => idx.toString()}

                            renderItem={({ item }) =>
                                <View style={styles1.commentBox}>
                                    <Text style={styles1.comentarios}>{item.user}: {item.descripcion}</Text>
                                </View>
                            }
                        />
                        :
                        <Text>Aún no hay comentarios.</Text>
                    }
        
                    <Text style={styles1.subtitle}>Agrega tu comentario!</Text>
                    <View style={styles1.formContainer}>
                        <TextInput
                            style={styles1.input} 
                            placeholder="Deja tu comentario acá."
                            onChangeText={(text) => this.setState({ comentario: text })}
                            keyboardType="default"
                            value={this.state.comentario}
                            />


                        <Pressable style={styles1.button} onPress={() => this.crearComentario()}>
                            <Text style={styles1.buttonText}>Enviar Comentario</Text>
                        </Pressable>
                    </View>
                </View>
            );
        } 
} 

const styles1 = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: "#fff", 
      padding: 12 
    },
    title: { 
      fontSize: 18, 
      fontWeight: "700", 
      marginVertical: 8, 
      color: "#0b3b5c" 
    },
    post: { 
      backgroundColor: "#f7fbff", 
      borderRadius: 10, 
      padding: 10, 
      borderWidth: 1, 
      borderColor: "#e0eef7", 
      marginBottom: 10 
    },
    postText: { 
      color: "#222", 
      marginBottom: 4 
    },
    flatList: { 
      flex: 1 
    },
    commentBox: { 
      paddingVertical: 8, 
      borderBottomWidth: 1, 
      borderBottomColor: "#eee" 
    },
    comentarios: { 
      color: "#222" 
    },
    subtitle: { 
      fontSize: 14, 
      fontWeight: "600", 
      marginTop: 8, 
      color: "#234" 
    },
  
    formContainer: { 
      flexDirection: "row", 
      alignItems: "center", 
      marginTop: 8 
    },
  
    input: { 
      flex: 1, 
      borderWidth: 1, 
      borderColor: "#ddd", 
      borderRadius: 8, 
      padding: 10, 
      backgroundColor: "#fff", 
      marginRight: 8 
    },
  
    button: { 
      backgroundColor: "#cfeeff", 
      paddingVertical: 10, 
      paddingHorizontal: 14, 
      borderRadius: 8, 
      borderWidth: 1, 
      borderColor: "#9fd0f0" 
    },
    buttonText: { 
      color: "#063a5a", 
      fontWeight: "600" 
    },
  });
  