import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, findNodeHandle, ActivityIndicator, Dimensions} from 'react-native';
import firebase from 'react-native-firebase';

import nature1 from '../../uploads/img/bench-carved-stones-cemetery-257360.jpg';
import check from '../../uploads/img/checked.png';
import cancel from '../../uploads/img/close.png';
import checkGrey from '../../uploads/img/tick.png';
import fon from '../../uploads/img/fon.jpg';

export default class QuizItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            laterKey: null,
            counter: 60,
            stopCounter: 0,
            viewRef: nature1,
            showBlur: '0%',
            viewRef: null,
            blurType: 'light',
            data: [],
            authentication: false,
            correctVariant: 0,
            sumAllStat: 0,
            click: false,
            dataUser: {},
            snapshot: '',
            fonImage: '1',
            title: '',
            answerQuiz: 0,
        }
        this.touchElement = this.touchElement.bind(this);
    }

    componentDidMount() {
        this.setState({ viewRef: findNodeHandle(fon), authentication: true });
        let urlFire = '-LgSX6B3EBqa1hn3-Cda';
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => { 
                firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                    this.setState({ dataUser: data.toJSON(), snapshot: snapshot.key });
                    firebase.database().ref("university/"+this.state.dataUser.university+"/answer").on("value", (snapshot) => {
                        console.log('snapshot');
                        console.log(snapshot._value);
                        this.setState({ answerQuiz: snapshot._value });
                    });
                })
            });
        });

        

        firebase.database().ref("Cards/Open/" + urlFire).once("value", (data) => {
            console.log('data.toJSON()');
            console.log(data.toJSON());
            this.setState({ data: data.toJSON().answers, fonImage: data.toJSON().image, title: data.toJSON().title });
        }).then(() => {
            console.log('data',this.state.data);
            this.setState({ authentication: false });
            for(let i = 0; i < this.state.data.length; i++) {
                this.state.data[i].border = -1;
                if(this.state.data[i].correct == true) {
                    this.setState({ correctVariant: i });
                }

                if(this.state.data[i].statisticChoose != undefined) {
                    let sum = this.state.sumAllStat
                    this.setState({ sumAllStat: sum + this.state.data[i].statisticChoose})
                }
                
                this.setState(state => {
                    const border = state.data[i].border = -1;
                    const image = state.data[i].image = checkGrey;
                    return {
                        border,
                        image
                    }
                });

            }
            console.log('sum', this.state.sumAllStat);

        })
        if(this.state.counter >= 0) {
            let timer = setInterval(this.tick, 1000);
            // this.setState({timer});
        } else {
            this.setState({ counter: 60 })
        }
    }

    tick =() => {
        if(this.state.counter > 0) {
            this.setState({
                counter: this.state.counter - 1
            });
        }
    }

    touchElement(key, letter) {
        if(this.state.click == true) {
            return;
        }
        this.setState({ click: true });
        let urlFire = '-LgSX6B3EBqa1hn3-Cda';

        this.setState({ stopCounter: this.state.counter, showBlur: '100%' });

        this.setState(state => {
            const correctShow = state.data[key].correctShow = 'flex';
            return {
                correctShow
            }
        });
        let sumStat = this.state.data[key].statisticChoose + 1;
        let statistic;
        if(this.state.data[key].statisticChoose != undefined) {
            statistic = Math.round( ( this.state.data[key].statisticChoose * 100 ) / this.state.sumAllStat );
        } else {
            statistic = 0;
        }
        
        if(key != this.state.correctVariant) {

            this.setState(state => {
                const list = state.data[key].border = 2;
                const image = state.data[key].image = cancel;
                const listCorrect = state.data[this.state.correctVariant].borderCorrect = 3;
                const statState = state.data[key].statistic = statistic;
                return {
                    list,
                    listCorrect,
                    image,
                    statState
                }
            });
        } else {
            this.setState(state => {
                const list = state.data[key].border = 2;
                const image = state.data[key].image = check;
                const statState = state.data[key].statistic = statistic;
                return {
                    list,
                    image,
                    statState
                }
            });
        }
        let statTime = this.state.counter;
        let sumTime;
        let countChoose;

        if(this.state.data[key].sumTime != undefined) {
            sumTime = this.state.data[key].sumTime;
        } else {
            sumTime = 0;
        }

        if(this.state.data[key].statisticChoose != undefined) {
            countChoose = this.state.data[key].statisticChoose;
        } else {
            countChoose = 0;
        }
        
        let averageTime = Math.round( ( statTime + sumTime ) / ( countChoose + 1 ) );
        sumTime = statTime + sumTime;

        firebase.database().ref("Cards/Open/" + urlFire + "/answers/" + key).update({
            statisticChoose: this.state.data[key].statisticChoose == undefined ? 1 : sumStat,
            statTime: averageTime,
            sumTime: sumTime,
        });

        var d = new Date();
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

        firebase.database().ref("users/"+this.state.snapshot+"/questions/"+urlFire).update({
            answer: key,
            correctAnswer: this.state.correctVariant,
            letter,
            time: this.state.counter,
            date: months[d.getMonth()] + ', ' + d.getDay() + ', ' + d.getFullYear(),
            title: this.state.title,
            fonImage: this.state.fonImage
        })
        firebase.database().ref("university/"+this.state.dataUser.university+"/questions/"+urlFire).update({
            answer: key,
            correctAnswer: this.state.correctVariant,
            letter,
            time: this.state.counter,
            date: months[d.getMonth()] + ', ' + d.getDay() + ', ' + d.getFullYear(),
            title: this.state.title,
            fonImage: this.state.fonImage
        });
        
        firebase.database().ref("university/"+this.state.dataUser.university).update({
            answer: this.state.answerQuiz+1,
        }); 
        
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
                    <Text style={{ color: '#FF6464' }}>0:{this.state.stopCounter == 0 ? this.state.counter : this.state.stopCounter}</Text>
                </View>
                <View>
                    <View style={[styles.fonStyle, {width: this.state.showBlur}]}></View>
                    <Image 
                        style={styles.backgrImg} 
                        source={{uri: this.state.fonImage}} 
                    />
                    <View style={styles.containerQuiz}>
                    {
                            this.state.data.map((value, key) => {
                                return (
                                    <TouchableHighlight key={key} underlayColor="transparent" style={{
                                        marginTop: 20,
                                        width: '80%',
                                        zIndex: this.state.data[key].border == 2 || this.state.data[key].borderCorrect == 3 ? 1000 : 10,
                                        }} onPress={() => this.touchElement(key, value.variant) }>
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
                                                        width: '45%'
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
                                    </TouchableHighlight>
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