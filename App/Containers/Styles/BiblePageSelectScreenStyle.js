import { StyleSheet, Dimensions, } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    navbar: {
        height: 50,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 20,
        marginRight: 8,
        marginLeft: 8,
    },
    titleText: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    headerContainer: {

    },
    header: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 49,
        // marginBottom: 1,
        marginTop: 4,
    },
    headerText: {
        marginLeft: 8,
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black'
    },
    segmentContainer: {
        // flex: 1,
        height: 40,
        borderColor: Colors.primary,
        borderWidth: 1,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 8,
        marginLeft: 8,
    },
    segment: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        flex: 0.5
    },
    segment_selected: {
        backgroundColor: Colors.primary
    },
    segment_unselected: {
        backgroundColor: 'transparent'
    },
    segment_text_selected: {
        color: Colors.white
    },
    segment_text_unselected: {
        color: Colors.primary
    },

    progressBar: {
        // height: 50,
        flex: 1,
        // margin: 20,
        // width: Dimensions.get('window').width,
        backgroundColor: 'red'
    },
    chapterSelectorView: {
        // height: 50,
        flex: 1,
        // margin: 20,
        // width: Dimensions.get('window').width,
        backgroundColor: Colors.white
    },


});



