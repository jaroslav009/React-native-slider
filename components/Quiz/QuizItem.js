import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, findNodeHandle, ActivityIndicator, Dimensions} from 'react-native';
import firebase from 'react-native-firebase';

import nature1 from '../../uploads/img/bench-carved-stones-cemetery-257360.jpg';
import check from '../../uploads/img/checked.png';
import cancel from '../../uploads/img/close.png';
import checkGrey from '../../uploads/img/tick.png';
import fon from '../../uploads/img/fon.jpg';

function startOfWeek(date)
{
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  return new Date(date.setDate(diff));

}

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
            dataUniversityAnswers: [],
            dataUserAnswers: [],
        }
        this.touchElement = this.touchElement.bind(this);
        this._backMain = this._backMain.bind(this);
    }

    componentDidMount() {
        this.setState({ viewRef: findNodeHandle(fon), authentication: true });
        const { navigation } = this.props;
        let urlFire = navigation.getParam('id', 'NO-ID');
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => { 
                firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                    
                    this.setState({ dataUser: data.toJSON(), snapshot: snapshot.key });
                    firebase.database().ref("university/"+data.toJSON().university).on("value", (snapshot) => {
                        console.log('snapshot._value', snapshot.toJSON());
                        if(snapshot._value != null) {
                            this.setState({
                                dataUniversity: snapshot._value,
                                answerQuiz: snapshot._value.answer,
                            });
                        }
                        
                    });
                    firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz").once("value", (snapshot) => {
                        this.setState({
                            dataUniversityAnswers: snapshot._value
                        });
                    });
                    firebase.database().ref("users/"+snapshot.key+"/answerQuiz/").once("value", (snapshot) => {                        
                        this.setState({
                            dataUserAnswers: snapshot._value
                        });
                    });
                })
            });
        });

        firebase.database().ref("Cards/Open/" + urlFire).once("value", (data) => {
            this.setState({ data: data.toJSON().answers, fonImage: data.toJSON().image, title: data.toJSON().title });
        }).then(() => {
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

        })
        if(this.state.counter >= 0) {
            let timer = setInterval(this.tick, 1000);
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

    async touchElement(key, letter) {
        if(this.state.click == true) {
            return;
        }
        this.setState({ click: true });
        const { navigation } = this.props;
        let urlFire = navigation.getParam('id', 'NO-ID');

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

        let date2 = new Date();
        let keyAnswer = undefined;
        let keyAnswerDay = 'last7';
        let correctAnswerCurrent = 1;
        let wrongAnswersCurrent = 1;

        if(this.state.dataUniversityAnswers == null || this.state.dataUniversityAnswers[keyAnswerDay] == undefined) {
            console.log('123');
            lenArrDataUniverAnsw = -1;
            keyAnswer = '0';
            if(key == this.state.correctVariant) {
                correctAnswerCurrent = 1;
                wrongAnswersCurrent = 0;
            } else {
                correctAnswerCurrent = 0;
                wrongAnswersCurrent = 1;
            }
        } else {
            const lenUniverAnswer = Object.keys(this.state.dataUniversityAnswers).length
            console.log('lenUniverAnswer', this.state.dataUniversityAnswers[keyAnswerDay]);
            let lenUniverAnswerDay;
            let keysAnswerDay;
            if(lenUniverAnswer != undefined) {
                lenUniverAnswerDay = Object.keys(this.state.dataUniversityAnswers[keyAnswerDay].data).length;
                keysAnswerDay = Object.keys(this.state.dataUniversityAnswers[keyAnswerDay].data);
                if(this.state.dataUniversityAnswers[keyAnswerDay].data['7'] != undefined & date2.getHours() == '23' && date2.getMinutes() == '59' && date2.getSeconds() == '59') {
                    await firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz/last14/").update({
                        data: this.state.dataUniversityAnswers[keyAnswerDay].data
                    });
                    await firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz/last7/").update({
                        data: {},
                    });

                    if(this.state.dataUniversityAnswers['last14'].data != undefined) {
                        await firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz/last21/").update({
                            data: this.state.dataUniversityAnswers['last14'].data
                        });
                        console.log('last21 from last14', this.state.dataUniversityAnswers);
                        if(this.state.dataUniversityAnswers['last21'].data != undefined) {
                            await firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz/last30/").update({
                                data: this.state.dataUniversityAnswers['last21'].data
                            });
                        }
                    }
                }
            }
            keyAnswer = date2.getDay();
            for(let value = 0; value < lenUniverAnswerDay; value++) {
                if(lenUniverAnswer == -1) {
                    break;
                }
                let date1 = new Date(this.state.dataUniversityAnswers[keyAnswerDay].data[keysAnswerDay[value]].date);
                console.log('dat31', date1, '     ', date1.getMonth() == date2.getMonth(), '    ', date1.getFullYear() == date2.getFullYear(),   '    ', date1.getDay() == date2.getDay());
                if( date1.getDay() == date2.getDay() && 
                    date1.getMonth() == date2.getMonth() && 
                    date1.getFullYear() == date2.getFullYear() || 
                    this.state.dataUniversityAnswers[keyAnswerDay].data == undefined ) {
                        console.log('qwdqw123');
                        if(key == this.state.correctVariant) {
                            correctAnswerCurrent = parseInt(this.state.dataUniversityAnswers[keyAnswerDay].data[keysAnswerDay[value]].correctAnswers)+1;
                            wrongAnswersCurrent = this.state.dataUniversityAnswers[keyAnswerDay].data[keysAnswerDay[value]].wrongAnswers;
                        } else {
                            correctAnswerCurrent = this.state.dataUniversityAnswers[keyAnswerDay].data[keysAnswerDay[value]].correctAnswers;
                            wrongAnswersCurrent = parseInt(this.state.dataUniversityAnswers[keyAnswerDay].data[keysAnswerDay[value]].wrongAnswers)+1;
                        }
                        break;

                } else {
                    console.log('qwdqw321');
                    
                    if(key == this.state.correctVariant) {
                        correctAnswerCurrent = 1;
                        wrongAnswersCurrent = 0;
                    } else {
                        correctAnswerCurrent = 0;
                        wrongAnswersCurrent = 1;
                    }
                }
            }
        }
        let dateBase = date2.getDay() == 0 ? '7' : date2.getDay();
        firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz/"+keyAnswerDay+"/data/"+dateBase).update({
            date: new Date(),
            correctAnswers: correctAnswerCurrent,
            wrongAnswers: wrongAnswersCurrent,
            day: date2.getDay()
        });

        // Statistic User
        date2 = new Date();
        keyAnswer = undefined;
        keyAnswerDay = 'last7';
        correctAnswerCurrent = 1;
        wrongAnswersCurrent = 1;
        if(this.state.dataUserAnswers == null || this.state.dataUserAnswers[keyAnswerDay] == undefined) {
            lenArrDataUniverAnsw = -1;
            keyAnswer = '0';
            if(key == this.state.correctVariant) {
                correctAnswerCurrent = 1;
                wrongAnswersCurrent = 0;
            } else {
                correctAnswerCurrent = 0;
                wrongAnswersCurrent = 1;
            }
        } else {
            const lenUniverAnswer = Object.keys(this.state.dataUserAnswers).length
            let lenUniverAnswerDay;
            let keysAnswerDay;
            if(lenUniverAnswer != undefined) {
                lenUniverAnswerDay = Object.keys(this.state.dataUserAnswers[keyAnswerDay].data).length;
                keysAnswerDay = Object.keys(this.state.dataUserAnswers[keyAnswerDay].data);
                if(this.state.dataUserAnswers[keyAnswerDay].data['7'] != undefined & date2.getHours() == '23' && date2.getMinutes() == '59' && date2.getSeconds() == '59') {
                    await firebase.database().ref("users/"+this.state.snapshot+"/answerQuiz/last14/").update({
                        data: this.state.dataUserAnswers[keyAnswerDay].data
                    });
                    await firebase.database().ref("users/"+this.state.snapshot+"/answerQuiz/last7/").update({
                        data: {},
                    });

                    if(this.state.dataUserAnswers['last14'].data != undefined) {
                        await firebase.database().ref("users/"+this.state.snapshot+"/answerQuiz/last21/").update({
                            data: this.state.dataUserAnswers['last14'].data
                        });
                        console.log('last21 from last14', this.state.dataUserAnswers);
                        if(this.state.dataUserAnswers['last21'].data != undefined) {
                            await firebase.database().ref("users/"+this.state.snapshot+"/answerQuiz/last30/").update({
                                data: this.state.dataUserAnswers['last21'].data
                            });
                        }
                    }
                }
            }
            keyAnswer = date2.getDay();
            for(let value = 0; value < lenUniverAnswerDay; value++) {
                if(lenUniverAnswer == -1) {
                    break;
                }
                let date1 = new Date(this.state.dataUserAnswers[keyAnswerDay].data[keysAnswerDay[value]].date);
                if( date1.getDay() == date2.getDay() && 
                    date1.getMonth() == date2.getMonth() && 
                    date1.getFullYear() == date2.getFullYear() || 
                    this.state.dataUserAnswers[keyAnswerDay].data == undefined ) {
                        console.log('qwdqw123');
                        if(key == this.state.correctVariant) {
                            correctAnswerCurrent = parseInt(this.state.dataUserAnswers[keyAnswerDay].data[keysAnswerDay[value]].correctAnswers)+1;
                            wrongAnswersCurrent = this.state.dataUserAnswers[keyAnswerDay].data[keysAnswerDay[value]].wrongAnswers;
                        } else {
                            correctAnswerCurrent = this.state.dataUserAnswers[keyAnswerDay].data[keysAnswerDay[value]].correctAnswers;
                            wrongAnswersCurrent = parseInt(this.state.dataUserAnswers[keyAnswerDay].data[keysAnswerDay[value]].wrongAnswers)+1;
                        }
                        break;

                } else {
                    if(key == this.state.correctVariant) {
                        correctAnswerCurrent = 1;
                        wrongAnswersCurrent = 0;
                    } else {
                        correctAnswerCurrent = 0;
                        wrongAnswersCurrent = 1;
                    }
                }
            }
        }

        console.log('User stat');
        
        firebase.database().ref("users/"+this.state.snapshot+"/answerQuiz/"+keyAnswerDay+"/data/"+dateBase).update({
            date: new Date(),
            correctAnswers: correctAnswerCurrent,
            wrongAnswers: wrongAnswersCurrent,
            day: date2.getDay()
        })
        // Statistic User
       
        let answerSum;
        console.log('dataUnivesrity', this.state.dataUniversity.answer)
        if(this.state.dataUniversity.answer != undefined) {
            answerSum = parseInt(this.state.dataUniversity.answer)+1
        } else {
            answerSum = 1;
        }
        firebase.database().ref("university/"+this.state.dataUser.university).update({
            answer: answerSum,
        });
        
    }

    _backMain() {
        this.props.navigation.navigate('Slack', { answer: this.state.click });
    }
    
    render() {

        // if(this.state.stopCounter == 0) {
        //     this.setState({showBlur: '100%'});
        // }

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
                <TouchableHighlight onPress={() => this._backMain()} underlayColor="transparent" 
                style={[styles.fonStyle, {width: this.state.showBlur}]}><Text></Text></TouchableHighlight>
                <View>
                    
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