import React, {Component} from 'react';
import {Text,Button,View,TextInput,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextHandler from '../dictionary/TextHandler';
import dict from '../../dictionaries';
import socketIOClient from 'socket.io-client'

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    textinput:{ 
        width: width / 1.3,
        textAlign: "left",
        color:'white',
        flex:1,
        paddingLeft:10,
    },
    pageContainer:{
        width: width,
        height: height,
        flex:1,
    },
    registerText:{
        color:'black',
        textAlign:'center',
    },
    signUpText:{
        color:'black',
        textAlign:'center',
    },
    signInButtonContainer:{
        width: width / 1.3,
    },
    textInputContainer:{
        borderRadius: 200,
        marginVertical: 10,
        borderWidth: 0.5,
        width: width / 1.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#3A3E47',
    },
    signInButton:{
        alignItems: 'center',
        backgroundColor:'#F06F5B',
        borderRadius: 200,
        height:50,
        justifyContent:'center',
        marginTop:10,
    },
    signUpTextContainer:{
        borderBottomWidth: 1,
    },
    userAndPassword:{
    },
    iconContainer:{
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:200,
        backgroundColor:'white',
        width:40,
        height:40,
        marginLeft:4.5,
    },
    langSelectionContainer:{
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginRight:10,
        marginTop:5,
    },
    loginContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width / 2,
    },
    errorMessage:{
        color:'#DC4339',
        marginTop:10,
    },
})

class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            email: undefined,
            password:undefined,
            selectedLang:"es",
            userNamePlaceholder:dict.lgn_welcome_username_input.es,
            socket:"",
            errorMessage:"",
        }
        
        handleEmail = (email) => {
            this.setState({email})
        }
    
        handlePassword = (password) => {
            this.setState({password})
        }
    
        redirectToRegisterScreen = () => (
           this.props.navigation.navigate(('MyModal'))
        )
        //TO DO: Validate password format 
        //Set dictionaries
        //TO ASK: Remember me ??
    
        setLanguage = (lang) => {  
            this.setState({
                selectedLang: lang,
                userNamePlaceholder: dict.lgn_welcome_username_input[lang]
            })
        }
        requestToSocket = (method, api, data, cb) => {
            let jwt = ""
            let socket = this.state.socket
            if (method === "get" || method === "post") {
                let requestCtx = {
                    method:method,
                    headers:{
                        Autorization: 'Berarer' + jwt},
                        data:data,
                        url:api
                    };
                    socket.emit(requestCtx.method,requestCtx,cb)

                    }else {
                        cb(new Error ('Wrong Method'))
                    }
        }
        logInRequest = () => {
            let loginCredentials = {
                email: this.state.email,
                password: this.state.password,
            }
            if(!this.state.email && !this.state.password) this.setState({errorMessage:"Ingresa un email y password"})
            else if(!this.state.email) this.setState({errorMessage:"Ingresa un email"})
            else if(!this.state.password) this.setState({errorMessage:"Ingresa un password"})
            else if(!validateEmail(this.state.email)) this.setState({errorMessage:"Ingresa un email valido"})
            else if(!validatePassword(this.state.password)) this.setState({errorMessage:"Ingresa un password valido"})
            //TODO ADD VALIDATIONS FOR EMAIL AND PASSWORD
            else{
                requestToSocket('post','/rest/api/v1/auth/login',loginCredentials,(data) => {
                    console.log(data)
                    if(!data.body.err){
                        this.setState({token: data.body.data.token})
                        console.log(this.state.token)
                        this.props.navigation.navigate(('StreamerMain'))
                    }else{
                        if(data.body.err.code === "E_WRONG_PASSWORD"){
                            this.setState({errorMessage:"Password es incorrecto"})
                        }
                        if(data.body.err.code === "E_USER_NOT_FOUND"){
                            this.setState({errorMessage:"Usuario no econtrado"})
                        }
                    }
                })
            }
        }
        validateEmail = (email) => {
            let regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(regExpEmail.test(email) === false) return true
            else return true
        }
        validatePassword = (password) => {
            if (password.length < 8) return false
            else return true
        }
    }

    componentWillMount(){

        const socket = socketIOClient('https://ucp.uxmalstream.com:35810?__sails_io_sdk_version=1.1.13',{
            secure: true,
            reconnect:true,
            log:true,
            rejectUnauthorized:false,
         },
        )
        socket
        .on('connect', () => {
            this.setState({socket})
            console.log("Contectado")
        })
        .on('connect_error', (data) => {
            console.log("No Conectado",data,socket)
            }
        )

    }
    render(){
        return(
            <View style={styles.pageContainer}>
                <View style={styles.langSelectionContainer}>
                    <View>
                        <TouchableOpacity
                        onPress={() => setLanguage("es")}
                        >
                        <Text>Español </Text>
                        </TouchableOpacity>
                    </View>
                    <Text>/</Text>
                    <View>
                        <TouchableOpacity
                        onPress={() => setLanguage("en")}>
                            <Text> English</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.loginContainer}>
                <Text style={styles.registerText}> REGISTER / LOGIN </Text>
                <View style={styles.textInputContainer}>
                    <View style={styles.iconContainer}>
                        <Icon style={styles.userAndPassword} name="user" size={30} />
                    </View>
                        <TextInput
                        onChangeText={handleEmail}
                        textContentType='emailAddress'
                        style={styles.textinput}
                        placeholder = {this.state.userNamePlaceholder}
                        placeholderTextColor ='white'/>
                </View>
                <View style={styles.textInputContainer}>
                <View style= {styles.iconContainer}>
                <Icon style={styles.userAndPassword} name="lock" size={30} /></View>
                    <TextInput
                    onChangeText={handlePassword}
                    textContentType='password' 
                    secureTextEntry = {true}
                    placeholder = 'Password'   
                    style={styles.textinput}
                    placeholderTextColor ='white'            
                    />
                </View>
                <View style={styles.signInButtonContainer}>
                    <TouchableOpacity
                    style={styles.signInButton}
                    onPress={logInRequest}>
                        <Text><TextHandler textId={"lgn_welcome_signin_btn"} selectedLang={this.state.selectedLang} /></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpTextContainer}>
                    <Text
                    onPress={redirectToRegisterScreen}
                    style={styles.signUpText}>
                    Sign Up</Text>
                </View>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
            </View>
        )
    }
}

export default Login