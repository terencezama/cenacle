import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import styles from './Styles/BiblePageScreenStyle'
import bible from '../../bible/json/fra-LSG'
import HTML from 'react-native-render-html'
import { _constructStyles } from 'react-native-render-html/src/HTMLStyles'
import { Colors } from '../Themes';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import schema from '../../bible/schema'
import Realm from 'realm'
import fs from 'react-native-fs'

const headerFont = {
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 8,
  },
  text: {
    fontSize: 20,
    color: Colors.white
  }
}
const navTitleStyle = {
  container:{
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginRight: 8,
    marginLeft: 8,
    padding: 5,
  },
  text:{
    fontSize:18,
    fontWeight: 'bold',
    color:Colors.white
  }
}
let biblePageScreen = null


class BiblePageScreen extends Component {
  //region navbar options
  static navigationOptions = ({ navigation }) => {
    // const {state} = navigation
    let ztitle = i18n.t('bible/menutitle')
    if(navigation && navigation.state.params){
      const {state:{params:{title}}} = navigation
      if(title){
        ztitle = title
      }
      
    }
    // if(navigation == )
    console.log('typeof nav',(typeof navigation))
    const options = {
      title: ztitle,
      headerTitle:(
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={navTitleStyle.container} onPress={() => {  }}>
            <Text style={navTitleStyle.text}>{ ztitle}</Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={headerFont.container} onPress={() => { biblePageScreen.increaseFontSize() }}>
            <Text style={headerFont.text}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={headerFont.container} onPress={() => { biblePageScreen.decreaseFontSize() }}>
            <Text style={headerFont.text}>A-</Text>
          </TouchableOpacity>
        </View>
      ),
    }
  //   if(navigation == null || navigation == undefined){
  //     options.title = i18n.t('screenEventFormTitle')
  //     return options
  //  }
  //   const {params} = navigation.state
  //   if(params != undefined && 'title' in params){
  //     options.title = params.title
  //   }else{
  //     options.title = i18n.t('screenEventFormTitle')
  //   }
    return options
  }
  
  
  

  //endregion

  //region view life cycle
  constructor() {
    super()
    this.state = {
      baseFontSize: 14
    }
    biblePageScreen = this
    this.offset = 0

    // this.props.navigation.setParams({
    //   headerTitle:(
    //     <View style={{ flexDirection: 'row' }}>
    //       <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
    //         <Text style={headerFont.text}>{ 'nice'}</Text>
    //       </TouchableOpacity>
    //     </View>
    //   ),
    // })

    
    Realm.open({
      path:fs.DocumentDirectoryPath+'/default.realm',
      schema:[schema.BookSchema,schema.ChapterSchema],
      // readOnly: true
    }).then(realm=>{
      console.log('realm loaded')
      let books = realm.objects('Book')
      console.log(books.length)
      // realm.write(() => {
      //   realm.create('Book', {make: 'Honda', model: 'RSX'});
      // });
    })

    // console.log(fs.ExternalDirectoryPath)
    // fs.readDir('').then(item=>{
    //   console.log(item)
    // })

    
  }

  componentDidMount(){
    this.props.navigation.setParams({ title: 'Gen 1' })
    // this.props.navigation.setParams({ title: 'Update Event' })
    console.log(this.props.navigation)
  }
  //endregion

  //region bible actions
  increaseFontSize = () => {
    console.log('increasing font size')
    this.setState({
      baseFontSize: this.state.baseFontSize + 1
    })
  }
  decreaseFontSize = () => {
    this.setState({
      baseFontSize: this.state.baseFontSize - 1
    })
  }

  _onTextPressed = (key, data) => {
    let s = {}
    s[key] = true
    this.setState(s)
  }

  //endregion

  //region action view
  _renderActionView = () => {
    const iconColor = 'white'
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 4, left: 0, right: 0, justifyContent: "space-between" }}>
        <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
          <FAIcon name="arrow-left" color={iconColor} size={15} />
        </TouchableOpacity>
        <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
        <FAIcon name="arrow-right" color={iconColor} size={15} />
        </TouchableOpacity>
      </View>
    )
  }
  //endregion
  //region html view 
  _renderers = () => {
    const state = this.state
    return {
      verse: {
        wrapper: 'Text', renderer: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          const { parentWrapper, onLinkPress, key, data } = passProps;
          const isHighlighted = state[key]

          const style = _constructStyles({
            tagName: 'span',
            htmlAttribs,
            passProps,
            styleSet: 'TEXT'
          });
          // console.log(style)
          return (
            <Text key={key} style={[style, { color: isHighlighted ? 'white' : 'black', backgroundColor: isHighlighted ? Colors.primary : 'transparent' }]} selectable={false}
              onPress={() => { this._onTextPressed(key, children || data) }}
            >
              {children || data}
            </Text>
          );
        }
      },
    }
  }
  //endregion

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{marginRight:8,marginLeft:8}}>
            <HTML
              html={unescape(bible.Gen["1"].data)}
              // onParsed={(dom, RNElements) => { this.onHTMLParsed(dom, RNElements) }}
              renderers={this._renderers()}
              // alterNode={(node)=>{this._alterNode(node)}}
              baseFontStyle={{ fontSize: this.state.baseFontSize }}
            />
          </View>
          <View style={{ height: 50 }}></View>
        </ScrollView>
        {this._renderActionView()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BiblePageScreen)
