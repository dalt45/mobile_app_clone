import React,{Component} from 'react';
import {Text,Linking,View,TouchableWithoutFeedback} from 'react-native';
import {createStackNavigator} from 'react-navigation';


class SignUp extends Component{
    static navigationOptions = {
        title:'Home'
    };
    render(){
        return(
            <View>
            <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.uxmalstream.mx/')}>
            <View>
            <Text>Registrate en Uxmal</Text>
            </View>
            </TouchableWithoutFeedback>
            </View>
        )
    }
}

export default SignUp