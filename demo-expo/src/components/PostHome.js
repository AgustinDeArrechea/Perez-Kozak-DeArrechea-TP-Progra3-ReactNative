import { Pressable, Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class PostHome extends Component {

    constructor(props){
        super(props)
        // Convertir createdAt a fecha legible y guardarla en el estado
        this.state = {
            ExactDate: new Date(this.props.data.createdAt).toLocaleString()
        }
    }

  render() {

    
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
              <Text style={styles.likesText}>likes</Text>
            </View>

            <Pressable  style={({pressed})=>[styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 10,
		paddingTop: 6
	},
	title: {
		fontSize: 12,
		fontWeight: '600',
		color: '#222',
		marginBottom: 6,
		paddingLeft: 6
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		padding: 10,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 2,
		elevation: 1
	},
	metaContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6
	},
	username: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#444'
	},
	meta: {
		color: '#666',
		fontSize: 11
	},
	content: {
		fontSize: 14,
		color: '#222',
		marginBottom: 10
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	likes: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	heart: {
		fontSize: 16,
		marginRight: 6
	},
	likesText: {
		fontSize: 12,
		color: '#555'
	},
	button: {
		backgroundColor: '#cfeeff',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#9fd0f0'
	},
	buttonPressed: {
		opacity: 0.9
	},
	buttonText: {
		color: '#063a5a',
		fontWeight: '600',
		fontSize: 12
	}
})

export default PostHome