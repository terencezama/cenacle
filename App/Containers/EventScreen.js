import React, { Component } from 'react'
import { 
  FlatList,Text
 } from 'react-native'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import EventItem from '../Components/EventItem'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EventScreenStyle'

class EventScreen extends Component {
  static navigationOptions = {
    title: i18n.t('screenEventTitle'),
  };

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.setState({
      events:[
        { 
          title: 'Prière a Henrietta',
          date: 1524234941,
          desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       { 
        title: 'Prière a Cite Argy',
        date: 1522627200,
        desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       { 
        title: 'Prière a Cite Argy',
        date: 1522627200,
        desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       { 
        title: 'Prière a Cite Argy',
        date: 1522627200,
        desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deauVenez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       { 
        title: 'Prière a Cite Argy',
        date: 1522627200,
        desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       { 
        title: 'Prière a Cite Argy',
        date: 1522627200,
        desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       { 
        title: 'Prière a Cite Argy',
        date: 1522627200,
        desc:'Venez en groupe la priere aura lieu a henrietta le 20 Avril 2018. Noublier pas votre bouteille deau'
       },
       
       
      ]
    })
  }

  //region FlatList
  _onCellPress = (item,index)=>{
    this.props.navigation.navigate('EventDetailsScreen',{event:item})
    
  }
  //endregion

  render() {
    const {events} = this.state
    return (
      <FlatList
        data={events}
        renderItem={({ item,index }) => <EventItem onPress={()=>{this._onCellPress(item,index)}} index={index}  data={item}/>}
        keyExtractor={(item, index) => index}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
