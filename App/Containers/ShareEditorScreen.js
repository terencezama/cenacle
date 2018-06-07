import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import styles from './Styles/ShareEditorScreenStyle'
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import {Button} from 'react-native-elements'
import LoadingView from '../Components/LoadingView'
import Toast, {DURATION} from 'react-native-easy-toast'
import { Colors } from '../Themes';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'
class ShareEditorScreen extends Component {
  static navigationOptions = {
    title: i18n.t('screenShareEditorTitle'),
  };
  state = {
    loading:false
  }

  constructor(props){
    super(props)
    this.ref = firebase.firestore().collection('cenacle').doc('app').collection('shares')
  }

  componentDidMount(){
    // this.refs.toast.show('hello world!');

  }

  _shareAction = async () => {
    const title = await this.richtext.getTitleText()
    const content =  await this.richtext.getContentHtml()
    
    if(title.length == 0){
      alert("Please insert a title");
      return;
    }

    if(content.length == 0){
      alert("Please insert a content");
      return;
    }

    this.ref.add({
      title,
      content,
      date:new Date()
    })

    this.refs.toast.show('Shared');

    this.richtext.setContentHTML('')
    this.richtext.setTitleHTML('')

    
  }

  render() {
    return (
        <View style={styles.container}>
          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={''}
              initialContentHTML={''}
              editorInitializedCallback={() => this.onEditorInitialized()}
              contentPlaceholder={'Please insert a title and description'}
          />
          <RichTextToolbar
            getEditor={() => this.richtext}
            selectedIconTint={Colors.white}
            iconTint={Colors.white}
            selectedButtonStyle={{backgroundColor:Colors.primary}}
            unselectedButtonStyle={{backgroundColor:'#737373'}}
            style={{backgroundColor:'#737373'}}

          />
          {Platform.OS === 'ios' && <KeyboardSpacer/>}
          <TouchableOpacity style={styles.button} onPress={()=>{this._shareAction()}}> 
            <Text style={styles.buttonTitle}>Share</Text>
          </TouchableOpacity>
          <LoadingView loading={this.state.loading}/>
          <Toast ref="toast" position="center"/>
        </View>
    );
  }

  onEditorInitialized() {

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

export default connect(mapStateToProps, mapDispatchToProps)(ShareEditorScreen)
