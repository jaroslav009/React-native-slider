import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Dimensions} from 'react-native';

import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'
import slack from '../../uploads/img/slack.png'

export default class Slack extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            clickHeader: false,
        }
        this.handleClickHeader = this.handleClickHeader.bind(this);
        this._back = this._back.bind(this);
    }

    _back() {
        const { navigation } = this.props;
        this.props.navigation.navigate('Dashboard', { answer: navigation.getParam('answer', 'NO-ID') });
    }

    handleClickHeader = (value) => {
        console.log('wdqdqdqw', value);
        
        this.setState({clickHeader: value});
    }

    render() {
        return(
            <ScrollView style={{height: '100%', backgroundColor: '#FAFAFD'}} stickyHeaderIndices={[0]}>
                <View style={{ minHeight: Dimensions.get('window').height }}>
                    <Header navigation={this.props.navigation} page="Perfomance" click={this.handleClickHeader} style={{ width: '100%', height: this.state.clickHeader == false ? 50 : '100%', position: 'absolute', zIndex: -1 }} />
                    <View style={{paddingLeft: 32, paddingRight: 32}}>
                        <View style={styles.arroweftCont}>
                            <TouchableHighlight onPress={() => this._back()} underlayColor="#fff">
                                <Image style={{width: 22, height: 15}} source={arrowLeft} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.contSlack}>
                        If you'd like to join in on further disussion about today's quiz, please join us on Slack. There you can meet with others in your area and around the country all participating in radQD.
                        </Text>

                        <Image style={{marginTop: 30}} source={slack} />

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    arroweftCont: {
        marginTop: 20,
    },
    contSlack: {
        color: '#3E3F42',
        fontSize: 16,
        marginTop: 30,
        fontFamily: 'SFUIText-Regular',
        lineHeight: 26
    },

})