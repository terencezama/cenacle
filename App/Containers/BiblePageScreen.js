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
import BibleHistoryScreen from './BibleHistoryScreen'
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
  underline = []
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
      isUnderlined: false,
      historyVisible: false,
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
      nindex['nohistory'] = 'nohistory';
      RNBibleRealm.setChapter(nindex)
      // nindex['nohistory'] = undefined;
    })
    
  }
  //endregion

  //region Events
  bibleRealmSetChapter = (chapter) => {
    this.setState({
      html: chapter.data,
      index: chapter.index,
      isUnderlined: false
    })
    this.underline.splice(0)
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

  _showHistory = () => {
    this.setState({ historyVisible: true });
  }

  //endregion

  //region action view
  _renderActionView = () => {
    const iconColor = 'white'
    if (this.state.isUnderlined){
      return (
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 4, left: 0, right: 0, justifyContent: "space-around" }}>
          <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
            <FAIcon name="times" color={iconColor} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
            <FAIcon name="copy" color={iconColor} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
            <FAIcon name="share" color={iconColor} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={headerFont.container} onPress={() => {  }}>
            <FAIcon name="pencil" color={iconColor} size={20} />
          </TouchableOpacity>
        </View>
      )
    }else{
      return (
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 4, left: 0, right: 0, justifyContent: "space-between" }}>
          <TouchableOpacity style={headerFont.container} onPress={() => { this._previousChapter() }}>
            <FAIcon name="arrow-left" color={iconColor} size={15} />
          </TouchableOpacity>
          <TouchableOpacity style={headerFont.container} onPress={() => { this._showHistory() }}>
            <FAIcon name="history" color={iconColor} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={headerFont.container} onPress={() => { this._nextChapter() }}>
            <FAIcon name="arrow-right" color={iconColor} size={15} />
          </TouchableOpacity>
        </View>
      )
    }
  }
  //endregion

  //region script
  webjs = function webjs(){
    document.onclick = onClickHandler;
        function onClickHandler(e) {
            var target = e.target;
            var underline = 'underline';
            let data = {};
            data["verse"] = target.dataset.verse;
            data["text"]= target.textContent;

            
            if (target.tagName.toLowerCase() == 'span') {
                if (target.classList.contains(underline)) {
                    target.classList.remove(underline);
                    data["action"]= "clear";
                } else {
                    target.classList.add(underline);
                    data["action"]= "underline";
                }
                window.postMessage(JSON.stringify(data));
            }

            
        }
  }
  //endregion
  



  render() {
    const { html } = this.state
    // console.log()
    return (
      <View style={styles.mainContainer}>
        <WebView source={{ html: html}} style={{ flex:1, padding:60, flexGrow:1}} ref={ref=>{this.webView = ref}}
        injectedJavaScript={String(this.webjs)+";webjs();"} 
        automaticallyAdjustContentInsets={true}
        onMessage={(event)=> {
          const data = JSON.parse(event.nativeEvent.data)
          
          if(data.action === "clear" ){
            let zdata = this.underline.filter(o => o.verse == data.verse)[0]
            let index = this.underline.indexOf(zdata)
            this.underline.splice(index,1)
          }else{
            this.underline.push(data);
          }
          if(this.underline.length == 0){
            this.setState({isUnderlined:false})
          }else{
            this.setState({isUnderlined:true})
          }
          
        }}
        />
        {this._renderActionView()}

        {/* Bible Page Screen */}
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
        
        {/* Bible History Screen */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.historyVisible}
          onRequestClose={() => {
            this.setState({historyVisible:false})
          }}>
          <BibleHistoryScreen  
          onClose={() => { this.setState({ historyVisible: false }) }}
          onSelected={(chapterId)=>{
            const {index} = this.state
            this.setState({ historyVisible: false })
            console.log(chapterId);
            let nindex = index;
            const book_chapter = chapterId.split(":")[1].split('.')
            
            nindex['book'] = book_chapter[0];
            // nindex['ord'] = chapter.ord;
            nindex['chapter'] = parseInt(book_chapter[1])
            RNBibleRealm.setChapter(nindex)
          }}
           />
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
