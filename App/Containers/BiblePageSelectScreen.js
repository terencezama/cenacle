import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    TouchableOpacity,
    ScrollView, Dimensions,
    DeviceEventEmitter, FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types'
import { Colors } from '../Themes';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import i18n from 'react-native-i18n'
import styles from './Styles/BiblePageSelectScreenStyle'
const { width, height } = Dimensions.get('window')
const delay = 300
import nextFrame from 'next-frame';
import { RNBibleRealm, ChapterSelectorView, ProgressBar } from 'react-native-bible-realm'
import { Overlay } from 'react-native-elements'


import Panel from '../Components/Panel'
class BiblePageSelectScreen extends Component {

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSelected: PropTypes.func.isRequired
    }

    constructor() {
        super()
        this.state = {
            segmentIndex: 0,
            order: 0,
            onBookSelected: false,
            viewType: 0,
            currentBook: null
        }
    }



    componentWillMount() {


    }
    componentDidMount() {
        // setTimeout(()=>{

        // },delay)
    }
    componentWillUnmount() {

    }

    //region Event Listener
    //endregion

    //region Actions

    _switchSegment = (index) => {
        let state = { ...this.state }
        state['segmentIndex'] = index
        // this.state = state
        this.setState({
            segmentIndex: index,
            order: index
        })


    }
    //endregion



    //region render
    _renderItem(section) {
        return (
            <Panel title={section.name} />
        );
    }


    _renderHeader = () => {
        const { onBookSelected, viewType, currentBook } = this.state
        const close = () => (
            <View style={styles.navbar}>
                <Text style={styles.titleText}>Livres </Text>
                <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.onClose() }}>
                    <FAIcon name={'close'} color="#fff" size={30} size={15} />
                </TouchableOpacity>
            </View>

        )
        const back = () => (

            <View style={[styles.navbar,{justifyContent:'flex-start'}]}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => {
                    this.setState({
                        viewType: viewType + 1,
                        onBookSelected: false
                    })
                }}>
                    <FAIcon name={'arrow-left'} color="#fff" size={30} size={15} />
                </TouchableOpacity>
                <Text style={[styles.titleText,{color:Colors.primary}]}>{currentBook.name} </Text>

            </View>

        )
        return onBookSelected ? back() : close()
        
    }
    _segmentStyle = (type, index) => {
        const { segmentIndex } = this.state
        let style = null
        if (type == 'text') {
            style = segmentIndex == index ? styles.segment_text_selected : styles.segment_text_unselected
        } else if (type == 'container') {
            style = segmentIndex == index ? styles.segment_selected : styles.segment_unselected
        }
        return style
    }
    _renderSegment = () => {
        return (
            <View style={styles.segmentContainer}>
                <TouchableWithoutFeedback
                    onPress={() => { this._switchSegment(0) }}>
                    <View style={[styles.segment, this._segmentStyle('container', 0)]}>
                        <Text style={this._segmentStyle('text', 0)}>{i18n.t('bible/traditional')}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => { this._switchSegment(1) }}>
                    <View style={[styles.segment, this._segmentStyle('container', 1)]}>
                        <Text style={this._segmentStyle('text', 1)}>{i18n.t('bible/alphabetical')}</Text>
                    </View>

                </TouchableWithoutFeedback>
            </View>
        )
    }
    render() {
        const { segmentIndex, order, viewType } = this.state
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                <ChapterSelectorView
                    tabText={{
                        "0":i18n.t("bible/traditional"),
                        "1":i18n.t("bible/alphabetical")
                    }}
                    style={styles.chapterSelectorView}
                    order={order}
                    viewType={viewType}
                    scrollPosition={this.props.cindex.ord-1}
                    onBookSelected={event => {
                        console.log('received event')
                        this.setState({
                            onBookSelected: true,
                            currentBook: event.nativeEvent
                        })
                        
                    }}
                    onChapterSelected={event => {

                        this.props.onSelected(event.nativeEvent)

                    }}
                    ref={ref => { this.cs = ref }} />
                {/* {this._renderAccordionContent()} */}

            </View>


        );
    }
    //endregion
}


export default BiblePageSelectScreen;
