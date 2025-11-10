import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import PostHome from '../components/PostHome'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      postsRecuperados: [],
    }
  }

  componentDidMount() {

    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
          let usersDocs = []
          docs.forEach((doc) => {
            usersDocs.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          this.setState({
            username: usersDocs[0].data.username,
            email: auth.currentUser.email
          })
        })

      db.collection('posts').where('owner', '==', auth.currentUser.email)
        .onSnapshot((docs) => {
          let postsDocs = []
          docs.forEach((doc) => {
            postsDocs.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          this.setState({
            postsRecuperados: postsDocs,
          })
        })
    }

  logout() {
    auth.signOut()
      .then(() => {
          this.props.navigation.navigate('Login')
      })
      .catch((err) => {
        console.log('Error al cerrar sesión:', err)
      })
  }

  render() {
    const { username, email, postsRecuperados } = this.state

    return (
      <View style={styles.container}>
        
        <View style={styles.profileSection}>
          <Text style={styles.title}>Mi Perfil</Text>

          <View style={styles.infoContainer}>
            <Text>Nombre de usuario:</Text>
            <Text style={styles.value}>{username}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <View style={styles.postsSection}>
            <Text>Mis Posteos</Text>
          </View>
        </View>

        <FlatList
          data={postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostHome nav={this.props.navigation} data={item.data} postId={item.id} />
          )}
        />

        {postsRecuperados.length === 0 && (
          <Text style={styles.noPostsText}>No tienes posteos aún</Text>
        )}
      

        <Pressable style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </Pressable>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },

  infoContainer: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  value: {
    fontSize: 16
  },

  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10
  },

  logoutButtonText: {
    color: '#fff',
    fontSize: 16
  },

  postsSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },

  noPostsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#666'
  }
})


export default Profile