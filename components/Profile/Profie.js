import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Animated, ScrollView, Dimensions, Picker, TextInput, TouchableHighlight} from 'react-native';
import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';
import check from '../../uploads/img/check-circular-button.png';
import cancel from '../../uploads/img/X.png';
import userFill from '../../uploads/img/user-fill.png';
import nature1 from '../../uploads/img/bench-carved-stones-cemetery-257360.jpg';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterAnsw: '',
        }
    }
    render() {
        return (
            <ScrollView style={styles.profile}>
                <Header />
                <View style={styles.wrapperProfile}>
                    <Image style={styles.arrowLeft} source={arrowLeft} />
                    <View style={styles.containerTitleProfile}>
                        <Text style={styles.titleProfie}>
                            EMORY UNIVERSITY
                        </Text>
                        <Text style={styles.subTitleProf}>
                            162 Students logged in
                        </Text>
                    </View>
                    <View style={styles.containerAnswer}>
                        <Text style={styles.answText}>732 Answers</Text>
                        <View>
                            <Image source={upArrow} style={styles.upArrow} />
                            <Image source={downArrow} style={styles.downArrow} />
                            <Picker
                                selectedValue={this.state.filterAnsw}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({filterAnsw: itemValue})
                                }>
                                <Picker.Item label="All" value="all" />
                                <Picker.Item label="Last 14 days" value="lastSecondWeek" />
                                <Picker.Item label="Last 21 days" value="lastThirdWeek" />
                                <Picker.Item label="Last Month" value="lastMonth" />
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.containerItemsAnswer, {marginTop: 15}]}>
                        <View style={{elevation: 5, backgroundColor: '#fff', marginTop: 15}}>
                            <View style={styles.topPartItem}>
                                <View style={styles.userContainer}>
                                    <Image source={userFill} style={styles.userFill} />
                                    <Text>65</Text>
                                </View>
                                <View>
                                    <Text style={styles.greyText}>
                                        Avg: 17 sec.
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.greyText}>
                                        Jan, 27, 2019
                                    </Text>
                                </View>
                            </View>
                            <Image source={nature1} style={styles.styleImageAnsw} />
                            <View style={styles.bottomPartItem}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.textBlue}>
                                        A
                                    </Text>    
                                    <View style={styles.titleItem}>
                                        <Text>Everything's alright</Text>
                                    </View>
                                </View>
                                <View style={styles.checkStyle}>
                                    <Image source={check} />
                                </View>

                            </View>
                        </View>
                        <View style={{elevation: 5, backgroundColor: '#fff', marginTop: 15}}>
                            <View style={styles.topPartItem}>
                                <View style={styles.userContainer}>
                                    <Image source={userFill} style={styles.userFill} />
                                    <Text>78</Text>
                                </View>
                                <View>
                                    <Text style={styles.greyText}>
                                        Avg: 17 sec.
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.greyText}>
                                        Jan, 27, 2019
                                    </Text>
                                </View>
                            </View>
                            <Image source={nature1} style={styles.styleImageAnsw} />
                            <View style={styles.bottomPartItem}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.textBlue}>
                                        C
                                    </Text>
                                    
                                    <View style={styles.titleItem}>
                                        <Text>We should ask House</Text>
                                    </View>
                                </View>
                                <View style={[styles.checkStyle, { borderColor: '#FF6464' }]}>
                                    <Image source={cancel} />
                                </View>

                            </View>
                        </View>
                    </View>
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
    },
    subTitleProf: {
        color: '#3E3F42',
        fontSize: 16,
        marginTop: 5
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
        fontSize: 20
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
        fontWeight: 'bold'
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
})