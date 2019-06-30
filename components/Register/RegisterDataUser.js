import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions, ActivityIndicator, Alert, Modal, TouchableHighlight, Image } from 'react-native';
import Logo from '../BasicComponents/Logo';
import firebase from 'react-native-firebase';

import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';

function validateUser(user) {
    if(user.length < 2) {
        return false;
    } else {
        return true;
    }
}

export default class RegisterDataUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textUser: '',
            textFName: '',
            textLName: '',
            textUniversity: '',
            textProffesion: '',
            errorUser: true,
            authentication: false,
            authErr: false,
            textProffesion: 'Profesion',
            showPicker: 'none'
        }
        this._onPressLearnMore = this._onPressLearnMore.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.setState({ authentication: false })
    }
    
    _onPressLearnMore() {
        this.setState({ authentication: true })
        const { navigation } = this.props;
        // All good
        firebase.database().ref("users/" + navigation.getParam('id', 'NO-ID')).update({
            // username: this.state.textUser,
            firstName: this.state.textFName,
            lastName: this.state.textLName,
            proffesion: this.state.textProffesion
        })
        .then(() => {
            firebase.database().ref("university/" + navigation.getParam('univerId')).once("value", (data) => {
                console.log('data.loggedUser', data.loggedUser, 'data', data);
                if(data._value.loggedUser == undefined) {
                    this.setState({ loggedUser: 1 });
                } else {
                    this.setState({ loggedUser: parseInt(data._value.loggedUser)+1 });
                }
            })
            .then(() => {
                firebase.database().ref("university/" + navigation.getParam('univerId')).update({
                    loggedUser: this.state.loggedUser,
                });
            })
        })
        .then(() => {
            console.log('success this.state.textUser' , this.state.textUser);        
            firebase.database().ref("university/" + navigation.getParam('univerId') + "/" + navigation.getParam('id', 'NO-ID')).update({
                firstName: this.state.textFName,
                lastName: this.state.textLName,
                proffesion: this.state.textProffesion,
                // username: this.state.textUser,
            }).then(() => {
                // firebase.auth().signOut();
                Alert.alert(
                    '',
                    "Thanks for registering! We're sending you a verification email now. Once you get it, just tap on the link inside to verify and access your account",
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                this.props.navigation.navigate('Login')
            }).catch((err) => {
                return console.log(err);
            })        
        }).catch((err) => {
            this.setState({ authentication: false });
            console.log('failed', err);
        })
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
                                Sign in below
                            </Text>
                        </View>
                        <View style={styles.wrapperFormLogin}>

                            <View style={styles.itemInputForm}>
                               
                                <TextInput
                                    style={[styles.inputForm, {paddingLeft: 10}]}
                                    onChangeText={(text) => this.setState({textFName: text})}
                                    placeholder="First name"
                                    placeholderTextColor="#3E3F42" 
                                />
                            </View>

                            <View style={styles.itemInputForm}>
                               
                                <TextInput
                                    style={[styles.inputForm, {paddingLeft: 10}]}
                                    onChangeText={(text) => this.setState({textLName: text})}
                                    placeholder="Second name"
                                    placeholderTextColor="#3E3F42" 
                                />
                            </View>

                            <View style={styles.itemInputForm}>
                               
                                <TouchableHighlight onPress={ () => {
                                        if(this.state.showPicker == 'none') this.setState({ showPicker: 'flex' /* must have */ });
                                        else this.setState({ showPicker: 'none' /* must have */ });

                                    } } 
                                        key="Picker" 
                                        underlayColor="transparent" 
                                        style={{ 
                                            backgroundColor: '#fff',
                                            display: 'flex',
                                        }}
                                    >
                                        <View style={{
                                            position: 'relative', 
                                            zIndex: 10000000000000000,
                                        }}>
                                                <Image source={upArrow} style={[styles.upArrow]} />
                                                <Image source={downArrow} style={[styles.downArrow]} />
                                            <Text style={[{
                                                fontSize: 14,
                                                fontFamily: 'SFUIText-Regular',
                                                marginRight: 30,
                                                padding: 5,
                                                display: this.state.showPicker == 'none' ? 'flex' : 'none' ,
                                                borderBottomColor: '#C9C9C9',
                                                borderBottomWidth: 1,
                                                color: '#3E3F42',
                                                paddingBottom: 10,
                                                width: '100%'

                                            }]}> {this.state.textProffesion} </Text>
                                            <View 
                                            style={{
                                                display: this.state.showPicker,
                                                marginTop: 20
                                            }}>
                                                <Modal 
                                                animationType="fade"
                                                transparent={false}
                                                visible={this.state.showPicker == 'none' ? false : true}
                                                style={{ display: 'flex',
                                                         justifyContent: 'center',
                                                         alignItems: 'center',
                                                         paddingTop: 20 }}
                                                >
                                                    <TouchableHighlight  style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        textProffesion: 'Med school student', // must have
                                                        showPicker: 'none'
                                                    })}>
                                                        <Text>Med school student</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        textProffesion: 'Postgrad', 
                                                        showPicker: 'none', 
                                                        
                                                    })}>
                                                        <Text>Postgrad</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        textProffesion: 'Attending/Other',
                                                        showPicker: 'none'
                                                    })}>
                                                        <Text>Attending/Other</Text>
                                                    </TouchableHighlight>
                                                </Modal>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    {/* Picker */}
                            </View>
                            
                        </View>
                        <View style={styles.mb30}>
                            <Text style={styles.greyText}>Forgot your password?</Text>
                        </View>
                        <View>
                            <Button
                                onPress={this._onPressLearnMore}
                                title="Sign up"
                                color={this.state.errorEmail == false || this.state.errorPassword == false ? '#9EA0A5' : '#1D8EAB'}
                            />
                        </View>
                    </View>
                    <View style={styles.wrapperJoin}>

                        <Text style={styles.greyText}>
                            No account yet?
                            <Text style={styles.join}> join now</Text>
                        </Text>
                        
                    </View>
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
        marginTop: Dimensions.get('window').height > 600 ? '70%' : '3%',
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
    },
    pickerItem: {
        padding: 6,
        zIndex: 100000,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 10,
        top: 5,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 10,
        top: 15,
        zIndex: 1000
    },
})