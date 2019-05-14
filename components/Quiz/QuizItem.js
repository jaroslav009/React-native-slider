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
                    image: checkGrey
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'B',
                    title: "Patient is healthy",
                    cancel: true,
                    border: -1,
                    image: checkGrey
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'C',
                    title: "Patient is healthy",
                    cancel: false,
                    border: -1,
                    image: checkGrey
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'D',
                    title: "Patient is healthy",
                    cancel: false,
                    border: -1,
                    image: checkGrey
                }
            ],
            laterKey: null,
            counter: 60,
            viewRef: nature1,
            showBlur: true,
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

        this.setState(state => {
            const list = state.dataQuiz[key].border = 2;
            return {
                list,
            };
        });

        if(this.state.dataQuiz[key].cancel == true) {
            this.setState(state => {
                const image = state.dataQuiz[key].image = check;
                return {
                    image,
                }
            })
        } else {
            for(let i = 0; i < this.state.dataQuiz.length; i++) {
                if(this.state.dataQuiz[i].cancel == true) {
                    this.setState(state => {
                        const image = state.dataQuiz[i].image = check;
                        return {
                            image,
                        }
                    });
                    this.setState(state => {
                        const list = state.dataQuiz[i].border = 2;
                        return {
                            list,
                        };
                    });
                }
            }
            this.setState(state => {
                const image = state.dataQuiz[key].image = cancel;
                return {
                    image,
                }
            })
        }
        
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(fon) });
      }
    render() {
        return (
            <ScrollView>
                <View style={styles.timerContainer}>
                    <Text style={{ color: '#FF6464' }}>0:{this.state.counter}</Text>
                </View>
                <View>
                    <Image 
                        style={styles.backgrImg} 
                        source={nature1} 
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />
                    <View style={styles.containerQuiz}>
                   
                        {
                            this.state.dataQuiz.map((value, key) => {
                                return (
                                    <TouchableHighlight key={key} underlayColor="white" style={{width: '70%'}} onPress={() => this.touchElement(key) }>
                                        <View style={[styles.itemQuiz]}>
                                            <View style={styles.bottomItem}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={[styles.greenText, {fontSize: 16}]}>{value.class}</Text>
                                                    <Text style={{marginLeft: 16, color: '#3E3F42', fontSize: 16}}>{value.title}</Text>
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
        marginTop: 20,
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
        bottom: -0,
        left: '30%',
        marginTop: 30
    },
    blurView: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
})