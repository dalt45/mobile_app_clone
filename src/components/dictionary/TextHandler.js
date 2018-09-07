import React from 'react'
import {Text} from  'react-native'
import dict from '../../dictionaries'


const TextHandler = (props) =>{
const textId = props.textId
const selectedLang = props.selectedLang
return(
<Text>{dict[textId][selectedLang]}</Text>
)
} 

export default TextHandler