import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';

import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'
import nature1 from '../../uploads/img/bench-carved-stones-cemetery-257360.jpg';
import userFill from '../../uploads/img/user-outlines.png';
import check from '../../uploads/img/check-circular-button.png';
import cancel from '../../uploads/img/X.png';

export default class Quiz extends Component {

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
                    border: -1
                },
                {
                    voice: '39 (39%)',
                    time: 'Avg: 32 sec.',
                    class: 'B',
                    title: "Patient is healthy",
                    cancel: true,
                    border: -1
                }
            ],
            laterKey: null,
        }
        this.touchElement = this.touchElement.bind(this);
    }

    touchElement(key) {
        if(this.state.laterKey == null) {
            this.setState({ laterKey: key });
        }
        this.setState(state => {
            const list = state.dataQuiz[key].border = 2;
                
            
            return {
                list,
            };
        });
        if(this.state.laterKey != null) {
            this.setState(state => {
                const list2 = state.dataQuiz[this.state.laterKey].border = 0;
                return {
                    list2,
                };
            });
        }
        
        this.setState({ laterKey: key });
    }

    render() {
        return (
            <ScrollView>
                <Header />
                <View>
                    <View style={styles.arroweftCont}>
                        <Image style={{width: 22, height: 15}} source={arrowLeft} />
                    </View>
                    <Image style={styles.backgrImg} source={nature1} />
                    <View style={styles.containerQuiz}>
                        {
                            this.state.dataQuiz.map((value, key) => {
                                return (
                                    <TouchableHighlight key={key} underlayColor="white" style={{width: '70%'}} onPress={() => this.touchElement(key) }>
                                        <View style={[styles.itemQuiz, {borderWidth: this.state.dataQuiz[key].border, borderColor: value.cancel == true ? '#1D8EAB' : '#FF6464'}]}>
                                            <View style={styles.topPartItem}>
                                                <View style={{display: 'flex', flexDirection: 'row', paddingLeft: 12, paddingRight: 12}}>
                                                    <Image source={userFill} />
                                                    <Text style={{marginLeft: 5, fontSize: 12}}>{value.voice}</Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.greyText, {fontSize: 12, paddingLeft: 12, paddingRight: 12}]}>
                                                        {value.time}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.bottomItem}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={[styles.greenText, {fontSize: 16}]}>{value.class}</Text>
                                                    <Text style={{marginLeft: 16, color: '#3E3F42', fontSize: 16}}>{value.title}</Text>
                                                </View>
                                                <View style={[styles.checkStyle, { borderColor: value.cancel == true ? '#1D8EAB' : '#FF6464' }]}>
                                                    <Image source={value.cancel == true ? check : cancel} />
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }
                        
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    backgrImg: {
        width: '100%',
        height: 150,
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
    topPartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    },
    greyText: {
        color: '#707070'
    },
    bottomItem: {
        paddingTop: 10,
        paddingBottom: 10,
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
})