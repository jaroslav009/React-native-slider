import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView, Dimensions, Picker, TextInput } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';
import magnifySearch from '../../uploads/img/magnifying-glass.png';

export default class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            score: '',
            itemsLeader: [
                {
                    title: 'Emory University',
                    score: 54,
                },
                {
                    title: 'Stanford University',
                    score: 24,
                },
                {
                    title: 'San Francisco Childrens Hospital',
                    score: 84,
                },
                {
                    title: 'San Francisco Childrens Hospital',
                    score: 14,
                },
                {
                    title: 'Emory University',
                    score: 44,
                },
            ]
        }
    }

    render() {
        return (
            <ScrollView style={styles.leader}>
                <Header />
                <View style={styles.wrapperLeader}>
                    <Image style={styles.arrowLeft} source={arrowLeft} />
                    <View style={styles.filterContainer}>
                        <Text style={styles.filterTitle}>Leaderboard</Text>
                        <View>
                            <Image source={upArrow} style={styles.upArrow} />
                            <Image source={downArrow} style={styles.downArrow} />
                            <Picker
                                selectedValue={this.state.score}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue) =>
                                    this.setState({score: itemValue})
                                }>
                                <Picker.Item style={styles.itemPickerLead} label="Score" value="score1" />
                                <Picker.Item style={styles.itemPickerLead} label="Score" value="score2" />
                                <Picker.Item style={styles.itemPickerLead} label="Title" value="title1" />
                                <Picker.Item style={styles.itemPickerLead} label="Title" value="title2" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.inputForm}
                        />
                        <Image source={magnifySearch} style={styles.searchImage} />
                    </View>
                    {/* <LinearGradient
                        colors={['#2FA4C2', '#1D8EAB']}
                        style={styles.containerLeader}
                    >
                        <View style={styles.itemLeader}>
                            <Text style={styles.textItemLeader}>Emory University</Text>
                            <Text style={styles.textItemLeader}>54</Text>
                        </View>
                    </LinearGradient> */}
                    {
                        this.state.itemsLeader.map((value, key) => {
                            return (
                                <View style={styles.containerLeader} key={key}>
                                    <View style={styles.itemLeader}>
                                        <Text style={styles.textItemLeader}>{value.title}</Text>
                                        <Text style={styles.textItemLeader}>{value.score}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={styles.containerLeader}>
                        <View style={styles.itemLeader}>
                            <Text style={styles.textItemLeader}>Emory University</Text>
                            <Text style={styles.textItemLeader}>54</Text>
                        </View>
                    </View>
                    <View style={styles.containerLeader}>
                        <View style={styles.itemLeader}>
                            <Text style={styles.textItemLeader}>Stanford University</Text>
                            <Text style={styles.textItemLeader}>44</Text>
                        </View>
                    </View>
                    <View style={styles.containerLeader}>
                        <View style={styles.itemLeader}>
                            <Text style={styles.textItemLeader}>San Francisco Childrens Hospital</Text>
                            <Text style={styles.textItemLeader}>14</Text>
                        </View>
                    </View>
                    <View style={styles.containerLeader}>
                        <View style={styles.itemLeader}>
                            <Text style={styles.textItemLeader}>San Francisco Childrens Hospital</Text>
                            <Text style={styles.textItemLeader}>74</Text>
                        </View>
                    </View>
                    
                </View>

                <View style={styles.borderWindowBottom}></View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    leader: {
        backgroundColor: '#FAFAFD',
        minHeight: '100%'
    },
    arrowLeft: {
        width: 22,
        height: 15
    },
    wrapperLeader: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
        paddingBottom: 25,
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    filterTitle: {
        fontSize: 18,
        color: '#3E3F42',
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
    pickerStyle: {
        height: 50, 
        width: Dimensions.get('window').width > 600 ? 110 : 120, 
        color: '#9EA0A5', 
        backgroundColor: '#FAFAFD',
        fontSize: 18,
        position: 'absolute',
        right: -30
    },
    inputForm: {
        height: 40,
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 1,
        color: '#3E3F42',
        paddingLeft: 10
    },
    searchContainer: {
        marginTop: 30
    },
    searchImage: {
        position: 'absolute',
        right: 20,
        top: 10,
        width: 20,
        height: 20
    },
    itemLeader: {
        // paddingleft: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 25,
        paddingBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        backgroundColor: '#2FA4C2',
        borderRadius: 5
    },
    textItemLeader: {
        color: '#fff'
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
