import { Pressable, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db,auth,firebase } from "../firebase/config";
import FontAwesome from '@expo/vector-icons/FontAwesome';

class PostHome extends Component {
  constructor(props) {
    super(props);
    // Convertir createdAt a fecha legible y guardarla en el estado
    this.state = {
      ExactDate: new Date(this.props.data.createdAt).toLocaleString(),
      MeGusta: false,
      error: "",
    };
  }

  componentDidMount() {
    // Verificar si el usuario actual ya dio like al post
    const userLiked = this.props.data.likes && this.props.data.likes.includes(auth.currentUser.email);
    this.setState({ MeGusta: userLiked });
  }

  componentDidUpdate(prevProps) {
    // Si cambiaron los likes, actualizar el estado MeGusta. Asi actualizamos el estado de megusta cuando cambian los likes en firestore
    if (prevProps.data.likes !== this.props.data.likes) {
		// Si cambiaron los likes compara si el usuario acutal esta en la lista de likes y actualiza el estado 
      const userLiked = this.props.data.likes && this.props.data.likes.includes(auth.currentUser.email);
      this.setState({ MeGusta: userLiked });
    }
  }

  agregarLike(postId) {
    db.collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => this.setState({ MeGusta: true }));
  }

  eliminarLike(postId) {
    db.collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => this.setState({ MeGusta: false }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {

	console.log('data', this.props.data);
	
    return (
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <View style={styles.metaContainer}>
            <Text style={styles.username}>{this.props.data.username}</Text>
            <Text style={styles.meta}> posteó {this.state.ExactDate} </Text>
          </View>
          <Text style={styles.content}>{this.props.data.posts}</Text>

          <View style={styles.footer}>
            <View style={styles.likes}>
              <Text style={styles.heart}></Text>

              {this.state.MeGusta ? (
                <Pressable onPress={() => this.eliminarLike(this.props.postId)}>
					<FontAwesome name="heart" size={24} color="black" />                
				</Pressable>
              ) : (
                <Pressable onPress={() => this.agregarLike(this.props.postId)}>
                  <FontAwesome name="heart-o" size={24} color="black" />
                </Pressable>
              )}

			  <Text> {this.props.data.likes.length} Likes </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                this.props.nav.navigate("Comments", {
                  postId: this.props.postId,
                })
              }
            >
              <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    paddingLeft: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  meta: {
    color: "#666",
    fontSize: 11,
  },
  content: {
    fontSize: 14,
    color: "#222",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
  },
  heart: {
    fontSize: 16,
    marginRight: 6,
  },
  likesText: {
    fontSize: 12,
    color: "#555",
  },
  button: {
    backgroundColor: "#cfeeff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9fd0f0",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: "#063a5a",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default PostHome;
