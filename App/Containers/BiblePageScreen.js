import React, { Component } from 'react'
import {
  ScrollView, Text, TouchableOpacity, View,
  Modal, DeviceEventEmitter, WebView, AsyncStorage
} from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import styles from './Styles/BiblePageScreenStyle'
// import HTML from 'react-native-render-html'
import { _constructStyles } from 'react-native-render-html/src/HTMLStyles'
import { Colors } from '../Themes';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import BiblePageSelectScreen from './BiblePageSelectScreen'
import {RNBibleRealm} from 'react-native-bible-realm'
// import HTMLView from 'react-native-htmlview'
import K from '../Services/Globals'


import nextFrame from 'next-frame'


//region styles
const headerFont = {
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    marginRight: 8,
    marginLeft: 8,
  },
  text: {
    fontSize: 20,
    color: Colors.white
  }
}
const navTitleStyle = {
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginRight: 8,
    marginLeft: 8,
    padding: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white
  }
}
let biblePageScreen = null
//endregion



class BiblePageScreen extends Component {
  //region navbar options
  static navigationOptions = ({ navigation }) => {
    // const {state} = navigation
    let ztitle = i18n.t('bible/menutitle')
    if (navigation && navigation.state.params) {
      const { state: { params: { title } } } = navigation
      if (title) {
        ztitle = title
      }

    }
    // if(navigation == )

    const options = {
      title: ztitle,
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={navTitleStyle.container} onPress={() => { biblePageScreen.setBooksViewVisible(true) }}>
            <Text style={navTitleStyle.text}>{ztitle}</Text>
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
    return options
  }
  //endregion

  //region view life cycle
  constructor() {
    super()
    let index = {
      version: 'fra-LSG',
      book: 'Gen',
      ord: 1,
      chapter: 1,
    }

    this.state = {
      booksVisible: false,
      index: index,
      html: '<h1>Welcome to cenacle</h1>',
      chapters: -1
    }
    biblePageScreen = this

    this.fontSize = 18
    
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('bible-realm-set-chapter', this.bibleRealmSetChapter);

    AsyncStorage.getItem(K.bibleFontSizeKey).then((result)=>{
      console.log('async result',result)
      if(result != null){
        this.fontSize = parseInt(result)
        RNBibleRealm.setFontSize(this.fontSize)
      }
    }).catch((error)=>{

    })
  }
  componentWillUnmount(){
    DeviceEventEmitter.removeListener('bible-realm-set-chapter');
}


  componentDidMount() {
    const {index} = this.state
    let nindex = index
    AsyncStorage.getItem(K.bibleLastView).then(result=>{
      if(result){
        nindex = JSON.parse(result);
      }
      RNBibleRealm.setChapter(nindex)
    })
    
  }
  //endregion

  //region Events
  bibleRealmSetChapter = (chapter) => {
    console.log('setting chapter',chapter.index)
    this.setState({
      html: chapter.data,
      index: chapter.index
    })
    const{ book:{name}, index} = chapter
    this.props.navigation.setParams({ title: `${name} ${index.chapter}` })
    AsyncStorage.setItem(K.bibleLastView,JSON.stringify(chapter.index))
  }
  //endregion

  //region bible user actions
  increaseFontSize = () => {
    this.fontSize++
    this.webView.postMessage("1");
    RNBibleRealm.setFontSize(this.fontSize)
    AsyncStorage.setItem(K.bibleFontSizeKey,""+this.fontSize)
  }
  decreaseFontSize = () => {
    this.fontSize--
    this.webView.postMessage("-1");
    RNBibleRealm.setFontSize(this.fontSize)
    AsyncStorage.setItem(K.bibleFontSizeKey,""+this.fontSize)
  }

  _onTextPressed = (key, data) => {
    let s = {}
    s[key] = true
    this.setState(s)
  }
  setBooksViewVisible(visible) {
    this.setState({ booksVisible: visible });
  }
  _setChapter = async (state) => {
    /*
    const { index: { version, book,chapter, ord }, chapters } = state
    console.log(this.state.index)
    const chapterId = `${version}:${book}.${chapter}`
    const bookId  = `${version}:${book}`
    //set navigation title 
    this.props.navigation.setParams({ title: `${book} ${chapter}` })

    await nextFrame();
    //load verse in html
    console.log('fetching verse',chapterId)
    const query1 = realm().objects('Chapter').filtered('id == $0', chapterId)
    const verse = query1[0]
    
    //set number of chapters if not computed
    let chaptersLength = chapters
    if(chapters == -1){
      console.log('calculating chapters length')
      const query2 = realm().objects('Book').filtered('id == $0',bookId)
      chaptersLength = query2[0].chapters.length
    }
    
    const index = {
      version,
      book,
      chapter,
      ord
    }
    
    this.setState({
      html: verse.data,
      chapters:chaptersLength,
      index
    })
    // console.log(verse)
    */
  }
  
  _nextChapter = () => {
    const {index} = this.state
    RNBibleRealm.changeChapter({
      index,
      delta:1
    })
  }
  _previousChapter = () => {
    const {index} = this.state
    RNBibleRealm.changeChapter({
      index,
      delta:-1
    })
  }

  //endregion

  //region action view
  _renderActionView = () => {
    const iconColor = 'white'
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 4, left: 0, right: 0, justifyContent: "space-between" }}>
        <TouchableOpacity style={headerFont.container} onPress={() => { this._previousChapter() }}>
          <FAIcon name="arrow-left" color={iconColor} size={15} />
        </TouchableOpacity>
        <TouchableOpacity style={headerFont.container} onPress={() => { this._nextChapter() }}>
          <FAIcon name="arrow-right" color={iconColor} size={15} />
        </TouchableOpacity>
      </View>
    )
  }
  //endregion
  



  render() {
    const { html } = this.state
    // console.log(html)
    const script = `
        <script>
          document.addEventListener('message', function(e) {
            if (document.body.style.fontSize == "") {
              document.body.style.fontSize = "${this.fontSize}px";
            }
            var delta = parseInt(e.data);
            document.body.style.fontSize=(parseFloat(document.body.style.fontSize)+delta)+"px";
          });
        </script>
    `
    let shtml = html.replace('<script></script>',script)
    return (
      <View style={styles.mainContainer}>
        <WebView source={{ html: shtml}} style={{ flex:1, padding:60, flexGrow:1}} ref={ref=>{this.webView = ref}}
        // injectedJavaScript={`document.body.style.fontSize = "${this.fontSize}px"`} 
        automaticallyAdjustContentInsets={true}
        />
        {this._renderActionView()}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.booksVisible}
          onRequestClose={() => {
            this.setState({ booksVisible: false })
          }}>
          <BiblePageSelectScreen onClose={() => { this.setState({ booksVisible: false }) }} onSelected={chapter=>{
            const {index} = this.state
            this.setState({ booksVisible: false })
            let nindex = index;
            /*
            version: 'fra-LSG',
            book: 'Gen',
            ord: 1,
            chapter: 50,
            */
            const bookId = chapter.id.split(':')[1]
            nindex['book'] = bookId;
            nindex['ord'] = chapter.ord;
            nindex['chapter'] = chapter.chapter
            RNBibleRealm.setChapter(nindex)
            // console.log('received chapter',chapter)
            
          }} />
        </Modal>
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
