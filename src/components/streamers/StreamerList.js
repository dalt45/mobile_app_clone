import React,{Component} from 'react';
import {Text} from 'react-native';

class StreamerList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Text>{this.props.token}</Text>
        )
    }
}
export default StreamerList