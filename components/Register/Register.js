import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, Button, ScrollView, Dimensions, ActivityIndicator, TouchableHighlight } from 'react-native';
import Logo from '../BasicComponents/Logo';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';

import findEmail from './findEmail';

// Images
import mail from '../../uploads/img/mail.png'
import padlock from '../../uploads/img/padlock.png'
import angleDown from '../../uploads/img/angle-down.png'
import idCard from '../../uploads/img/id-card3x.png'

function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
  }
  
function validatePassword(pass) {
    if(pass.length < 6) {
        return false;
    } else {
        return true;
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textEmail: '',
            textPassword: '',
            textUser: '',
            errorUser: true,
            errorEmail: true,
            errorPassword: true,
            errorDate: true,
            dateSelected: '',
            date:"",
            authentication: false,
            authErr: false,
        }
        this._onPressLearnMore = this._onPressLearnMore.bind(this);
        this._toLogin = this._toLogin.bind(this);
    }
    
    _onPressLearnMore() {
        
        if(this.state.textEmail.length == 0 && this.state.textPassword == 0 && this.state.date == '') {
            this.setState({ errorEmail: false, errorPassword: false, errorDate: false });
        } else if(this.state.textEmail.length == 0) {
            this.setState({ errorEmail: false })
        } else if(this.state.textPassword.length == 0) {
            this.setState({ errorPassword: false })
        } else if(this.state.date == '') {
            this.setState ({ errorDate: false });
        }
        else if(this.state.errorPassword == false || this.state.errorEmail == false || this.state.errorDate == false) {
            return;
        } else {
            // All good
            
            this.setState({ authentication: true })
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.textEmail, this.state.textPassword, this.state.date)
            .then(() => {
                console.log('auth data user ');
                let idUser = makeid(10)
                let dataUserEmail = findEmail(this.state.textEmail.toLowerCase());
                console.log('idUswer', idUser);
                
                console.log('success');
                firebase.database().ref("university").orderByChild("lastPart").equalTo(dataUserEmail.lastPart).on("child_added", (snapshot) => {
                    
                    firebase.database().ref('university/'+snapshot.key).once("value", (data) => {
                        console.log('data success', data._value.name)
                        firebase.database().ref("users/" + idUser).set({
                            email: this.state.textEmail.toLowerCase(),
                            born: this.state.date,
                            state: data._value.state,
                            university: snapshot.key,
                            username: this.state.textEmail.toLowerCase()
                        }).then(() => {
                            firebase.auth().currentUser.sendEmailVerification().then(function() {
                                console.log('send ')
                            }, function(error) {
                                console.log('err send', error)
                            });
                            firebase.database().ref("university/" + snapshot.key + "/" + idUser).set({
                                email: this.state.textEmail.toLowerCase(),
                                born: this.state.date,
                                state: data._value.state,
                                username: this.state.textEmail.toLowerCase()
                            })
                            .then(() => {
                                this.setState({ authentication: false, authErr: false });
                                this.props.navigation.navigate('RegisterDataUser', {
                                    id: idUser,
                                    univerId: snapshot.key,
                                });
                            })
                            .catch((err) => {
                                console.log('failed univer', err);
                                this.setState({ authentication: false, authErr: false });
                            })
                        })
                        .catch((err) => {
                            console.log('err user', err);
                            this.setState({ authentication: false, authErr: false });
                        })
                        
                    })
                });
                
            })
            .catch(error => {
                console.log('error', error)
                this.setState({ authentication: false, authErr: true });
            })
        }
        
    }

    _toLogin() {
        this.props.navigation.navigate('Login');
    }

    render() {
        if(this.state.authentication == true) {
            return (
                <View style={styles.containerActivity}>
                    <ActivityIndicator size="large" /> 
                </View>
            )
        } 
        return (
            <ScrollView>
                <View style={styles.wrapperLogin} showsVerticalScrollIndicator={true}>
                    <View>  
                        <View style={styles.wrapperHeaderLogin}>
                            <Logo />
                            <Text style={styles.greyText}>
                                Sign up below
                            </Text>
                        </View>
                        <View style={styles.wrapperFormLogin}>
                            <View>
                                <Text style={[styles.errText, {opacity: this.state.authErr == true ? 1 : 0}]}>Such user exists</Text>
                            </View>
                            <View style={styles.itemInputForm}>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => { this.setState({ errorEmail: validateEmail(text), textEmail: text }) }} 
                                    placeholder="Email"
                                    placeholderTextColor="#3E3F42" 
                                />
                                <Image style={styles.imageInput} source={mail} />
                                <Text style={[styles.errText, {opacity: this.state.errorEmail == false ? 1 : 0}]}>Please enter a complete email address</Text>
                            </View>
                            <View style={styles.itemInputForm}>
                                <DatePicker
                                    style={styles.dateInput}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1960-01-01"
                                    maxDate="2019-12-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => {this.setState({date: date, errorDate: true})}}
                                />

                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(date) => {this.setState({date: date})}}
                                    placeholder=""
                                    value={this.state.date}
                                    placeholderTextColor="#3E3F42"
                                />
                                
                                <Image style={styles.imageSelect} source={angleDown} />
                                <Image style={styles.imageInput} source={idCard} />
                                <Text style={[styles.errText, {opacity: this.state.errorDate == false ? 1 : 0}]}>Select your date born</Text>
                            </View>
                            <View style={styles.itemInputForm}>
                               
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this.setState({textPassword: text, errorPassword: validatePassword(text)})}
                                    placeholder="Password"
                                    placeholderTextColor="#3E3F42" 
                                    secureTextEntry={true}
                                />
                                <Image style={styles.imageInputPass} source={padlock} />
                                <Text style={[styles.errText, {opacity: this.state.errorPassword == false ? 1 : 0}]}>Password must be a minimum of 6 characters
</Text>
                            </View>
                        </View>
                        <View>
                            <Button
                                onPress={this._onPressLearnMore}
                                title="Next step"
                                color={this.state.errorEmail == false || this.state.errorPassword == false ? '#9EA0A5' : '#1D8EAB'}
                            />
                        </View>
                    </View>
                    <TouchableHighlight style={styles.wrapperJoin} onPress={() => this._toLogin()} underlayColor="#fff">

                        <Text style={styles.greyText}>
                            Have account?
                            <Text style={styles.join}> LOG IN NOW </Text>
                        </Text>
                        
                    </TouchableHighlight>
                </View>
                
            </ScrollView>
        )   
    }
}

const styles = StyleSheet.create({
    wrapperLogin: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: Dimensions.get('window').height > 600 ? 50 : 10,
        justifyContent: 'space-between'
    },
    greyText: {
        color: '#C9C9C9',
        fontSize: 18,
    },
    wrapperHeaderLogin: {
        display: 'flex',
        height: 50
    },
    wrapperFormLogin: {
        paddingTop: 30
    },
    inputForm: {
        height: 40,
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 1,
        color: '#3E3F42',
        paddingLeft: 40
    },
    imageInput: {
        width: 17, 
        height: 12,
        position: 'absolute',
        top: '25%',
        left: 10
    },
    imageInputPass: {
        width: 17, 
        height: 21,
        position: 'absolute',
        top: '15%',
        left: 10
    },
    itemInputForm: {
        position: 'relative',
        marginBottom: 30
    },
    buttonForm: {
        paddingTop: 18,
        paddingBottom: 18,
        borderRadius: 20,
        marginTop: 30
    },
    mb30: {
        marginBottom: 30
    },
    join: {
        color: '#1D8EAB',
        textTransform: 'uppercase',
        fontWeight: '400'
    },
    wrapperJoin: {
        marginTop: Dimensions.get('window').height > 600 ? '30%' : '3%',
    },
    errText: {
        color: '#FF6464',
        fontSize: 14,
    },
    imageSelect: {
        width: 17, 
        height: 12,
        position: 'absolute',
        top: '25%',
        right: 10,
        borderBottomWidth: 0
    },
    dateInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: 100000
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})