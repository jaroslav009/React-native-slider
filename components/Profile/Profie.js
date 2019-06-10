import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions, Picker, TouchableHighlight, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase'
import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png';
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';
import check from '../../uploads/img/checked.png';
import cancel from '../../uploads/img/close.png';
import userFill from '../../uploads/img/user-fill.png';

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterAnsw: '',
            dataUser: {},
            columnStudents: 0,
            authentication: true,
            questions: [],
            showQues: [],
            answerQuiz: 0,
            count: {
                start: 1,
                end: 0,
            },
            lastItem: 'http://www.youandthemat.com/wp-content/uploads/nature-2-26-17.jpg',
            countArr: 1,
            normVariant: [],
        }
        this._back = this._back.bind(this);
        this._toQuestProfile = this._toQuestProfile.bind(this);
        this._press = this._press.bind(this);
        this.correctFilter = this.correctFilter.bind(this);
        this.wrongFilter = this.wrongFilter.bind(this);
        this.allFilter = this.allFilter.bind(this);
    }
    _back() {
        this.props.navigation.goBack()
    }

    _toQuestProfile(value) {
        this.props.navigation.navigate('Quiz', { value });
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => { 
                    firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                        this.setState({ dataUser: data.toJSON() });
                        firebase.database().ref("university").orderByChild("name").equalTo(data.toJSON().university).once("child_added", (snapshot) => {
                            this.setState({ columnStudents: Object.size(snapshot._value) - 3, authentication: false })
                        });
                        firebase.database().ref("university/"+data.toJSON().university+"/answer").on("value", (snapshot) => {
                            this.setState({ answerQuiz: snapshot._value });
                        });
                    })
                });
                firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => { 
                    firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                        this.setState({ dataUser: data.toJSON(), snapshot: snapshot.key });
                    })
                });
            } else {
                this.props.navigation.navigate('Login');
            }
            
        });

        firebase.database().ref("Cards/Open").limitToLast(200).once("value", (data) => {
            for(item in data._value) {
                this.setState(state => {
                    data._value[item].styleShow = "flex";
                    question = state.questions.push(data._value[item]);
                    return {
                        question
                    }
                })
            }
            if(this.state.questions.length < 5) {
                let i = 1;
                for(item in data._value) {
                    console.log('test', data._value[item])
                    if(i > 1) {
                        // Nothing
                    }
                    else {
                        this.setState(state => {
                            question = state.showQues.push(data._value[item]);
                            return {
                                question,
                            }
                        })
                        console.log('showques 2 ', this.state.showQues)
                    }
                    i++;
                }
            } else {
                let i = 1;

                for(item in data._value) {
                    if(i <= 5) {
                        this.setState(state => {
                            let question = state.showQues.push(data._value[item]);
                            let count = state.countArr = 5;
                            return {
                                question,
                                count
                            }
                        });
                    }
                    
                    i++;
                }
            }
        })
    }

    _press() {
        let count = 5;
        for(let i = this.state.countArr;i < 200; i++) {
            // if(count < 1) {
            //     if(i < this.state.questions.length) {

            //         // Audit filter begin
            //         let sumUser = 0;
            //         let boofer = 0;
            //         let keyArr = undefined;
            //         this.state.questions[i].answers.map((val) => {

            //             if(val.statisticChoose != undefined) {
            //                 sumUser = val.statisticChoose + sumUser;
            //             }
            //             if(val.statisticChoose > boofer) {
            //                 normVariant = val.variant;
            //                 correctVar = val.correct;
            //                 boofer = val.statisticChoose;
            //                 // Audit on correct
            //                 if(this.state.filterAnsw == "correct") {
            //                     if(val.correct != true) {
            //                         keyArr = 1;
            //                     } else {
            //                         keyArr = undefined;
            //                     }
            //                 }
            //                 // Audit on correct

            //                 // Audit on wrong
            //                 else if(this.state.filterAnsw == "wrong") {
            //                     if(val.correct != undefined) {
            //                         keyArr = 1;
            //                     } else {
            //                         keyArr = undefined;
            //                     }
            //                 }
            //                 // Audit on wrong

            //                 // Audit on all
            //                 else {
            //                     keyArr = undefined;
            //                 }
            //                 // Audit on all
            //             }
            //         });
            //         // Audit filter end

            //         // Write data in show questions:
            //         this.setState(state => {
            //             let data = this.state.questions[i];
            //             if(keyArr != undefined) {
            //                 data.styleShow = "none"
            //             }
            //             let question = state.showQues.push(data)
            //             let count = state.countArr = i+1;
                        
            //             return {
            //                 question,
            //                 count
            //             }
            //         });
            //     }
               
            // }
            if(count > 1) {
                if(this.state.questions.length - this.state.countArr < 5) {
                    count = this.state.questions.length - this.state.countArr;
                    if(this.state.questions.length - this.state.countArr == 0) {
                        break;
                    }
                }
                console.log(`count ${count}`)

                this.setState(state => {
                    let question = state.showQues.push(this.state.questions[i])
                    let count = state.countArr = i+1;
                    return {
                        question,
                        count
                    }
                });
            }
            else {
                break;
            }
            count--;
        }
        
    }

    correctFilter() {
        this.setState(state => {
            let variant = state.normVariant = [];
            return {
                variant
            }
        });
        this.state.showQues.map((value, key) => {
            let sumUser = 0;
            let boofer = 0;
            let keyArr = undefined;

            this.setState(state => {
                let variant = state.showQues[key].styleShow = "flex";
                return {
                    variant
                }
            });
            
            value.answers.map((val) => {

                if(val.statisticChoose != undefined) {
                    sumUser = val.statisticChoose + sumUser;
                }
                if(val.statisticChoose > boofer) {
                    normVariant = val.variant;
                    correctVar = val.correct;
                    boofer = val.statisticChoose;
                    if(val.correct != true) {
                        keyArr = 1;
                    } else {
                        keyArr = undefined;
                    }
                }
                console.log(val.statisticChoose);
            });
            if(keyArr != undefined) {
                this.setState(state => {
                    let variant = state.showQues[key].styleShow = "none";
                    return {
                        variant
                    }
                })
            }
        });
    }

    wrongFilter() {
        this.setState(state => {
            let variant = state.normVariant = [];
            return {
                variant
            }
        });
        this.state.showQues.map((value, key) => {
            let sumUser = 0;
            let boofer = 0;
            let keyArr = undefined;
            value.answers.map((val) => {

                this.setState(state => {
                    let variant = state.showQues[key].styleShow = "flex";
                    return {
                        variant
                    }
                });

                if(val.statisticChoose != undefined) {
                    sumUser = val.statisticChoose + sumUser;
                }
                if(val.statisticChoose > boofer) {
                    normVariant = val.variant;
                    correctVar = val.correct;
                    boofer = val.statisticChoose;
                    if(val.correct != undefined) {
                        keyArr = 1;
                    } else {
                        keyArr = undefined;
                    }
                }
            });
            if(keyArr != undefined) {
                this.setState(state => {
                    let variant = state.showQues[key].styleShow = "none";
                    return {
                        variant
                    }
                })
            }
        });
    }

    allFilter() {
        this.state.showQues.map((value, key) => {
            this.setState(state => {
                let variant = state.showQues[key].styleShow = "flex";
                return {
                    variant
                }
            })
            
            console.log(this.state.showQues.length);
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
            <ScrollView 
            style={styles.profile}
            >
                <Header navigation={this.props.navigation} page="Profile" />
                <View style={styles.wrapperProfile}>
                    <TouchableHighlight onPress={() => this._back()} underlayColor="transparent">
                        <Image style={styles.arrowLeft} source={arrowLeft} />
                    </TouchableHighlight>
                    <View style={styles.containerTitleProfile}>
                        <Text style={styles.titleProfie}>
                            {this.state.dataUser.university}
                        </Text>
                        <Text style={styles.subTitleProf}>
                            {this.state.columnStudents} Students logged in
                        </Text>
                    </View>
                    <View style={styles.containerAnswer}>
                        <View style={{marginTop: 11}}>
                            <Text style={styles.answText}>{this.state.answerQuiz} Answers</Text>
                        </View>
                        <View>
                            <Image source={upArrow} style={styles.upArrow} />
                            <Image source={downArrow} style={styles.downArrow} />
                            <Picker
                                selectedValue={this.state.filterAnsw}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({filterAnsw: itemValue})
                                    if(itemValue == 'correct') {
                                        this.correctFilter();
                                    } 
                                    else if(itemValue == 'wrong') {
                                        this.wrongFilter();
                                    } 
                                    else {
                                        this.allFilter();
                                    }
                                }
                                }>
                                <Picker.Item label="All" value="all" />
                                <Picker.Item label="Correct" value="correct" />
                                <Picker.Item label="Wrong" value="wrong" />
                            </Picker>
                        </View>
                    </View>

                    {/* Start answer */}
                    <View style={[styles.containerItemsAnswer, {marginTop: 15}]}>

                        {
                            this.state.showQues.map((value, key) => {
                                let sumUser = 0;
                                let normVariant = 0;
                                let correctVar = true;
                                let timeAvenger = 0;
                                let boofer = 0;
                                value.answers.map((val) => {

                                    if(val.statisticChoose != undefined) {
                                        sumUser = val.statisticChoose + sumUser;
                                    }
                                    
                                    if(val.statisticChoose > boofer) {
                                        normVariant = val.variant;
                                        correctVar = val.correct;
                                        boofer = val.statisticChoose;
                                        if(val.statTime != undefined) {
                                            timeAvenger = val.statTime;
                                        } else {
                                            timeAvenger = 0;
                                        }
                                    }
                                    console.log(val.statisticChoose);
                                });
                                
                                return (
                                    <TouchableHighlight key={key} 
                                        onPress={() => this._toQuestProfile(value)} 
                                        underlayColor="transparent"
                                        style={{display: this.state.showQues[key].styleShow}}
                                        >
                                        <View style={{elevation: 5, backgroundColor: '#fff', marginTop: 15}}>
                                            
                                                <View style={styles.topPartItem}>
                                                    <View style={styles.userContainer}>
                                                        <Image source={userFill} style={styles.userFill} />
                                                        <Text>{sumUser}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.greyText}>
                                                            Avg: {timeAvenger} sec.
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.greyText}>
                                                            {value.created}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Image source={{uri: value.image}} style={styles.styleImageAnsw} />
                                                <View style={styles.bottomPartItem}>
                                                    <View style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Text style={styles.textBlue}>
                                                            {normVariant}
                                                        </Text>    
                                                        <View style={styles.titleItem}>
                                                            <Text style={styles.titleBottomPart}>{value.title}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[styles.checkStyle, { borderColor: correctVar == true ? '#1D8EAB' : '#FF6464'} ]}>
                                                        <Image source={correctVar == true ? check : cancel} style={{width: 20, height: 20}} />
                                                    </View>

                                                </View>
                                            
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableHighlight underlayColor="#1D8EAB"
                            style={{marginTop: 50, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: '#1D8EAB',
                                padding: 5,
                                width: '50%'
                            }}
                            onPress={this._press}>
                                <Text style={{color: '#fff'}}>Upload more</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {/* End answer */}
                </View>
                <View style={styles.borderWindowBottom}></View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        backgroundColor: '#FAFAFD',
        minHeight: '100%'
    },  
    arrowLeft: {
        width: 22,
        height: 15
    },
    wrapperProfile: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
        paddingBottom: 25,
    },
    containerTitleProfile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17
    },
    titleProfie: {
        color: '#3E3F42',
        fontSize: 24,
        fontFamily: 'SFUIText-Semibold'
    },
    subTitleProf: {
        color: '#3E3F42',
        fontSize: 16,
        marginTop: 5,
        fontFamily: 'SFUIText-Semibold'
    },
     pickerStyle: {
        width: Dimensions.get('window').width > 600 ? 110 : 120, 
        color: '#9EA0A5', 
        backgroundColor: '#FAFAFD',
        fontSize: 18,
        position: 'absolute',
        right: -30
    },
    upArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 14,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 25,
        zIndex: 101111100
    },
    containerAnswer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 35
    },
    answText: {
        color: '#3E3F42',
        fontSize: 20,
        fontFamily: 'SFUIText-Semibold'
    },
    greyText: {
        color: '#707070',
        fontSize: 12
    },
    topPartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userFill: {
        marginRight: 5
    },
    styleImageAnsw: {
        width: '100%',
        height: 100
    },
    bottomPartItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    textBlue: {
        color: '#1D8EAB',
        fontSize: 16,
        marginRight: 15,
        fontFamily: 'SFUIText-Semibold'
    },
    titleItem: {
        color: '#3E3F42',
        fontSize: 16,
        marginLeft: 15
    },
    checkStyle: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1D8EAB',
        padding: 5
    },
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        bottom: -0,
        left: '30%',
        marginTop: 30
    },
    titleBottomPart: {
        fontFamily: 'SFUIText-Semibold',
        fontSize: 16,
        color: '#3E3F42'
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})