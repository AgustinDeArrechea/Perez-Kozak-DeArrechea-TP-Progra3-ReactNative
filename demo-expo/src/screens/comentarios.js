import React, {Component} from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { db, auth } from "firebase";
import firebase from "firebase";
import {db, auth} from "../firebase/config";

export default class Comentarios extends Component {
  constructor(props){
    super(props);
    this.state={
        post: "",
        comentarios: "",
        error: "",
    }
  }

  componentDidMount(){
    const postId = this.props.route.params.id;
    db.collection('posts')
    .doc(postId)
    .onSnapshot((doc) => {
        let post = doc.data();
        let comentarios = doc.data().comentarios;
        let owner = doc.data().owner;
        this.setState({
            post: post,
            comentarios: comentarios,
            owner: owner,
         });
     });

    }

    
    crearComentario() {
        if (this.state.comentario !== "") {
            const postId = this.props.route.params.id;
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
                        <FlatList style={styles1.flatList} data={this.state.comentarios} keyExtractor={(item) => item.id}
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
                            placeholder="Deja tu comentario acá."
                            onChangeText={(text) => this.setState({ comentario: text })}
                            keyboardType="default"
                            value={this.state.comentario} />

                        <Pressable style={styles1.button} onPress={() => this.crearComentario()}>
                            <Text style={styles1.buttonText}>Enviar Comentario</Text>
                        </Pressable>
                    </View>
                </View>
            );
        } 
} 
