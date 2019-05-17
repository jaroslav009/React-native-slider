import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView, Dimensions, Picker } from 'react-native';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPoint: this.props.maxPoint,
        }
    }

    componentDidMount() {
        for (var prop in this.props.data[0]) {
            if(this.state.maxPoint < this.props.data[0][prop].number) {
                this.setState({ maxPoint: this.props.data[0][prop].number });
            }
        }
    }
    render() {
        let heightTopGraphic;
        return( 
            <View style={styles.wrapperChart}>
                <View style={[styles.wrapperChartTop]}>
                    {
                        this.props.data[0].map((value, key) => {
                            heightTopGraphic = (value.number*100)/this.state.maxPoint;
                            return (
                                <View key={key}>
                                    <View style={[styles.itemChart, {height: heightTopGraphic, width: 23}]}> 
                                        {/* <Text>{value.number}</Text> */}
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.wrapperChartBottom}>
                    {
                        this.props.data[1].map((value, key) => {
                            heightTopGraphic = (value.number*100)/this.state.maxPoint;
                            return (
                                <View key={key}>
                                    <View>
                                        <View style={[styles.itemChartBottom, {height: heightTopGraphic, width: 23}]}> 
                                        </View>
                                        
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.wrapperTextChart}>
                    {
                        this.props.data[1].map((value, key) => {
                            heightTopGraphic = (value.number*100)/this.state.maxPoint;
                            return (
                                <View key={key}>
                                    <Text style={[styles.textName]}>{value.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemChart: {
        backgroundColor: '#1D8EAB',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    itemChartBottom: {
        backgroundColor: '#F0F0F0',
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    textName: {
        textAlign: 'center',
        marginTop: 10,
        color: '#9EA0A5',
        fontFamily: 'SFUIText-Regular'
    },
    wrapperChartTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        alignItems: 'flex-end',
    },
    wrapperChartBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 0,
        alignItems: 'flex-start',
    },
    wrapperTextChart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})