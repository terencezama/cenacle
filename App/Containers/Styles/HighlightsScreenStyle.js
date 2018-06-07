import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
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
  itemContainer:{
    backgroundColor:Colors.white,
    margin: 8,
    borderRadius: 10,
    // minHeight: 100,
    justifyContent:'space-around'
  },
  itemBody:{
    margin: 8,
    fontSize: 16,
    // fontWeight: 'bold'
  },
  itemDesc:{
    color:Colors.primary,
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  }
})
