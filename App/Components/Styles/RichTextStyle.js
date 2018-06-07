import {StyleSheet} from 'react-native'
import { Colors } from '../../Themes';
const styles = StyleSheet.create({
    container:{
        margin: 8,
    },
    b:{
        fontWeight: 'bold',
    },
    i:{
        fontStyle: 'italic'
    },
    t:{
        fontSize: 18
    },
    h:{
        fontSize: 20,
        color:'black',
        fontWeight:'bold'
    },
    ul:{
        margin:4,
        marginRight: 8,
    },
    br:{
        height:2
    },
    ol:{
        margin:4,
        marginRight: 8,
        
    },
    date:{
        color:Colors.primary
    }
    
});

export default styles;