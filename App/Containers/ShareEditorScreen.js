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
  static navigationOptions = ({ navigation }) => {
    const options = {}
    if(navigation == null || navigation == undefined){
      options.title = i18n.t('screenShareEditorTitle')
      return options
   }
    const {params} = navigation.state
    if(params != undefined && 'title' in params){
      options.title = params.title
    }else{
      options.title = i18n.t('screenShareEditorTitle')
    }
    return options
  }
  state = {
    loading:false,
    initialValues: {
      title: '',
      content: ''
    },
  }

  constructor(props){
    super(props)
    this.ref = firebase.firestore().collection('cenacle').doc('app').collection('shares')
  }

  componentDidMount(){
    // this.refs.toast.show('hello world!');
    const {params} = this.props.navigation.state
    if(params != undefined && 'update' in params){
      
      // this.props.navigationOptions.t
      this.props.navigation.setParams({title:'Update Event'})
      this.setState({
        initialValues: params.update.item,
        update: true
      })
    }

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

    const {update, initialValues} = this.state;
    
    if(!update){
      this.ref.add({
        title,
        content,
        date:new Date()
      })
    }else{
      this.ref.doc(initialValues.key).update({
        title,
        content
      })
    }

    

    this.refs.toast.show('Shared');

    this.richtext.setContentHTML('')
    this.richtext.setTitleHTML('')

    
  }

  render() {
    const {initialValues:{title,content},update} = this.state
    return (
        <View style={styles.container}>
          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={title}
              initialContentHTML={content}
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
            <Text style={styles.buttonTitle}>{update?'Update':'Share'}</Text>
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
