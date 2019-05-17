import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, findNodeHandle, ImageBackground} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import nature1 from '../../uploads/img/bench-carved-stones-cemetery-257360.jpg';
import check from '../../uploads/img/check-circular-button.png';
import cancel from '../../uploads/img/X.png';
import checkGrey from '../../uploads/img/tick.png';
import fon from '../../uploads/img/fon.jpg';

export default class QuizItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataQuiz: [
                {
                    voice: '37 (52%)',
                    time: 'Avg: 32 sec.',
                    class: 'A',
                    title: "Everything's Alright",
                    cancel: false,
                    border: -1,
                    image: checkGrey,
                    correct: '65% made same mistake',
                    correctShow: 'none'
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'B',
                    title: "Patient is healthy",
                    cancel: true,
                    border: -1,
                    image: checkGrey,
                    correct: '27% got this right!',
                    correctShow: 'none'
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'C',
                    title: "Patient is healthy",
                    cancel: false,
                    border: -1,
                    image: checkGrey,
                    correct: '65% made same mistake',
                    correctShow: 'none'
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'D',
                    title: "Patient is healthy",
                    cancel: false,
                    border: -1,
                    image: checkGrey,
                    correct: '65% made same mistake',
                    correctShow: 'none'
                }
            ],
            laterKey: null,
            counter: 60,
            stopCounter: 0,
            viewRef: nature1,
            showBlur: '0%',
            viewRef: null,
            blurType: 'light',
            
        }
        this.touchElement = this.touchElement.bind(this);
    }

    componentDidMount() {
        this.setState({ viewRef: findNodeHandle(fon) });
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

    touchElement(key) {

        for(let i = 0; i<this.state.dataQuiz.length; i++) {
            if(this.state.dataQuiz[i].image == check || this.state.dataQuiz[i].image == cancel) {
                return false;
            }
        }
        
        this.setState({ stopCounter: this.state.counter })        
        this.setState(state => {
            const list = state.dataQuiz[key].border = 2;
            return {
                list
            }
        });
        if(this.state.dataQuiz[key].cancel == true) {            
            this.setState(state => {
                const image = state.dataQuiz[key].image = check;
                const correctShow = state.dataQuiz[key].correctShow = 'flex';
                return {
                    image,
                    correctShow,
                }
            });

        } else {
            for(let i = 0; i < this.state.dataQuiz.length; i++) {
                if(this.state.dataQuiz[i].cancel == true) {
                    this.setState(state => {
                        const image = state.dataQuiz[i].image = check;
                        const correctShow = state.dataQuiz[key].correctShow = 'flex';
                        const list = state.dataQuiz[i].border = 2;
                        return {
                            image,
                            correctShow,
                            list
                        }
                    });
                }
            }
            this.setState(state => {
                const image = state.dataQuiz[key].image = cancel;
                return {
                    image,
                }
            });
        }
        this.setState({ showBlur: '100%' });
        
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(fon) });
      }
    render() {
        return (
            <ScrollView>

                <View style={styles.timerContainer}>
                    <Text style={{ color: '#FF6464' }}>0:{this.state.stopCounter == 0 ? this.state.counter : this.state.stopCounter}</Text>
                </View>
                <View>
                    <View style={[styles.fonStyle, {width: this.state.showBlur}]}></View>
                    <Image 
                        style={styles.backgrImg} 
                        source={nature1} 
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />
                    <View style={styles.containerQuiz}>
                   
                        {
                            this.state.dataQuiz.map((value, key) => {
                                return (
                                    <TouchableHighlight key={key} underlayColor="white" style={{
                                        marginTop: 20,
                                        width: '80%',
                                        zIndex: this.state.dataQuiz[key].border == 2 ? 1000 : 10,
                                        }} onPress={() => this.touchElement(key) }>
                                        <View style={[styles.itemQuiz]}>
                                            <View style={styles.bottomItem}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={[styles.greenText, {fontSize: 16, fontFamily: 'SFUIText-Semibold'}]}>{value.class}</Text>
                                                    <Text style={{marginLeft: 16, 
                                                        color: '#3E3F42', 
                                                        fontSize: 16, 
                                                        fontFamily: 'SFUIText-Semibold', 
                                                        display: this.state.dataQuiz[key].correctShow == 'none' || this.state.dataQuiz[key].correctShow == undefined ? 'flex' : 'none'}}>{value.title}</Text>
                                                    {/* Correct */}
                                                    <View style={{
                                                        display: this.state.dataQuiz[key].correctShow == 'flex' && this.state.dataQuiz[key].cancel == true ? 'flex' : 'none',
                                                        marginLeft: 6,
                                                        flexDirection: 'row',
                                                        alignItems: 'flex-start'
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
                                                        }}>{this.state.dataQuiz[key].correct}</Text>
                                                    </View>
                                                    {/* Correct */}
                                                    {/* Wrong */}
                                                    <View style={{
                                                        display: this.state.dataQuiz[key].correctShow == 'flex' && this.state.dataQuiz[key].cancel == false ? 'flex' : 'none',
                                                        marginLeft: 6,
                                                        flexDirection: 'row',
                                                        alignItems: 'flex-start'
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
                                                        }}>{this.state.dataQuiz[key].correct}</Text>
                                                    </View>
                                                    {/* Wrong */}
                                                </View>
                                                <View style={[styles.checkStyle, { borderColor: value.cancel == true ? '#1D8EAB' : '#FF6464', borderWidth: this.state.dataQuiz[key].border }]}>
                                                    <Image style={{width: 20, height: 20}} source={this.state.dataQuiz[key].image} />
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
        zIndex: 100
    }
})