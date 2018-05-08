import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    if(navigatorRef != null){
        // console.tron.log({navon:navigatorRef.props})
        _navigator = navigatorRef;
    }
    
  
}

function getTopLevelNavigator(){
    return _navigator
}

// add other navigation functions that you need and export them

export default {
    setTopLevelNavigator,
    getTopLevelNavigator
    
};