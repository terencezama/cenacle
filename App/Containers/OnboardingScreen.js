import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
import Images from '../Themes/Images'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OnboardingScreenStyle'

class OnboardingScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={Images.holySpirit} resizeMode='contain' />
        <View style={[styles.image,styles.textContainer]}>
          <Text style={[styles.text,{fontWeight:'bold'}]}> {'Cenacle Du St Esprit'} </Text>
          <Text style={[styles.text,{fontSize:20}]}> {`Mais le consolateur, l'Esprit-Saint, que le Père enverra en mon nom, vous enseignera toutes choses, et vous rappellera tout ce que je vous ai dit.`} </Text>
          <Text style={[styles.text,{fontWeight:'bold',fontSize:20}]}> {`Jean 14:26`} </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen)
