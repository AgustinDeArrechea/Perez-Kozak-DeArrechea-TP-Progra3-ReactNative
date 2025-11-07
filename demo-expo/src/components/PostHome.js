import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'

class PostHome extends Component {

    constructor(props){
        super(props)
        
    }

  render() {
    return (
      <View>
        <Text>...Posteo ....a las...hs</Text>
        <Text>post</Text>
        <Pressable>Like</Pressable>
        <Pressable>comentar</Pressable>
      </View>
    )
  }
}

export default PostHome