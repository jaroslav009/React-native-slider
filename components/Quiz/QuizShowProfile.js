import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Dimensions, TouchableHighlight} from 'react-native';
import firebase from 'react-native-firebase';

import check from '../../uploads/img/checked.png';
import cancel from '../../uploads/img/close.png';
import checkGrey from '../../uploads/img/tick.png';
import arrowLeft from '../../uploads/img/left-arrow.png'

export default class QuizShowProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            laterKey: null,
            counter: 60,
            stopCounter: 0,
            showBlur: '0%',
            viewRef: null,
            blurType: 'light',
            data: [],
            authentication: false,
            correctVariant: 0,
            click: false,
            dataUser: {},
            snapshot: '',
            fonImage: '1',
            title: '',
            dataUserValue: {},
        }
        this._back = this._back.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log('value navigate ',navigation.getParam('value'));
        this.setState({ authentication: true });
        let urlFire = navigation.getParam('id');
        this.setState({ dataUserValue: navigation.getParam('value') });
        firebase.database().ref("Cards/Open/" + urlFire).once("value", (data) => {
            this.setState({ data: data.toJSON().answers, fonImage: data.toJSON().image, title: data.toJSON().title });
        }).then(() => {
            this.setState({ authentication: false });
            for(let i = 0; i < this.state.data.length; i++) {
                this.state.data[i].border = -1;
                if(this.state.data[i].correct == true) {
                    this.setState({ correctVariant: i });
                }
                this.setState(state => {
                    let border = -1;
                    let image = state.data[i].image = checkGrey;
                    if(navigation.getParam('value').answer == i) {
                        border = state.data[i].border = 2;
                        
                        if(navigation.getParam('value').answer == navigation.getParam('value').correctAnswer) {
                            image = state.data[i].image = check
                        } else {
                            image = state.data[i].image = cancel
                        }
                        
                    } else {
                        border = state.data[i].border = -1;
                    }
                    return {
                        border,
                        image,
                    }
                });
            }
        })
    }

    _back() {
        this.props.navigation.goBack()
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

                <View style={styles.timerContainer}>
                    <Text>0:{this.state.dataUserValue.time}</Text>
                </View>
                <View>
                    <View style={[styles.fonStyle, {width: this.state.showBlur}]}></View>
                    <TouchableHighlight onPress={() => this._back()} underlayColor="#fff" style={styles.arroweftCont}>
                        <Image style={{width: 22, height: 15}} source={arrowLeft} />
                    </TouchableHighlight>
                    <Image 
                        style={styles.backgrImg} 
                        source={{uri: this.state.fonImage}} 
                    />
                    <View style={styles.containerQuiz}>
                    {
                            this.state.data.map((value, key) => {
                                return (
                                    <View key={key} style={{
                                        marginTop: 20,
                                        width: '80%',
                                        zIndex: this.state.data[key].border == 2 || this.state.data[key].borderCorrect == 3 ? 1000 : 10,
                                        }} >
                                        <View style={[styles.itemQuiz, {
                                            borderWidth: this.state.data[key].borderCorrect,
                                            borderColor: '#1D8EAB',
                                            }]}>
                                            <View style={styles.bottomItem}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={[styles.greenText, {fontSize: 16, fontFamily: 'SFUIText-Semibold'}]}>{value.variant}</Text>
                                                    <Text style={{marginLeft: 16, 
                                                        color: '#3E3F42', 
                                                        fontSize: 16, 
                                                        fontFamily: 'SFUIText-Semibold', 
                                                        }}>{value.name}</Text>
                                                    {/* Correct */}
                                                    <View style={{
                                                        display: this.state.data[key].correctShow == 'flex' && this.state.data[key].correct == true ? 'flex' : 'none',
                                                        marginLeft: 6,
                                                        flexDirection: 'row',
                                                        alignItems: 'flex-start',
                                                        width: '55%'
                                                        }}>
                                                        <Text style={{
                                                            fontFamily: 'SFUIText-Semibold',
                                                            fontSize: 16,
                                                            color: '#3E3F42',
                                                            marginRight: 5
                                                        }}>Correct!
                                                        </Text>
                                                        <Text style={{
                                                            paddingLeft: 3,
                                                            fontSize: 12,
                                                            paddingTop: 4
                                                        }}>{this.state.data[key].statistic}% got this right!</Text>
                                                    </View>
                                                    {/* Correct */}
                                                    {/* Wrong */}
                                                    <View style={{
                                                        display: this.state.data[key].correctShow == 'flex' && this.state.data[key].correct == undefined ? 'flex' : 'none',
                                                        marginLeft: 6,
                                                        flexDirection: 'row',
                                                        alignItems: 'flex-start',
                                                        width: '55%'
                                                        }}>
                                                        <Text style={{
                                                            fontFamily: 'SFUIText-Semibold',
                                                            fontSize: 16,
                                                            color: '#3E3F42', 
                                                            marginRight: 5
                                                        }}>Wrong!
                                                        </Text>
                                                        <Text style={{
                                                            fontSize: 12,
                                                            paddingTop: 4
                                                        }}>{this.state.data[key].statistic}% made same mistake</Text>
                                                    </View>
                                                    {/* Wrong */}
                                                </View>
                                                <View style={[styles.checkStyle, { borderColor: value.correct == true ? '#1D8EAB' : '#FF6464', borderWidth: this.state.data[key].border }]}>
                                                    <Image style={{width: 20, height: 20}} source={this.state.data[key].image} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        } 
                       
                    </View>
                </View>
                
                <View style={styles.borderWindowBottom}></View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    backgrImg: {
        width: '100%',
        height: 400,
        position: 'relative'
    },
    arroweftCont: {
        backgroundColor: '#fff',
        padding: 10,
        position: 'absolute',
        zIndex: 100,
        left: 20,
        top: 20
    },
    containerQuiz: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemQuiz: {
        backgroundColor: '#fff',
        top: -30,
        // width: '70%',
        elevation: 5,
        borderRadius: 5
    },
    greyText: {
        color: '#707070'
    },
    bottomItem: {
        paddingTop: 19,
        paddingBottom: 19,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    greenText: {
        color: '#1D8EAB'
    },
    checkStyle: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1D8EAB',
        padding: 5
    },
    timerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 26,
        paddingBottom: 16
    },
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        left: '30%',
        bottom: 10
    },
    blurView: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    fonStyle: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: '100%',
        width: '100%',
        zIndex: 70
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})