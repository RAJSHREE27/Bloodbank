import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, AsyncStorage, ActivityIndicator, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import { Constants } from 'expo';
import axiosInstance from '../axiosInstance';
import OneSignal from 'react-native-onesignal';
import {BASE_URL} from '../../config';

const { width, height } = Dimensions.get('window');

const TransactionCard = (props) => {
    return (
        <View style={{ borderColor: '#3C3C3C',borderBottomWidth: 0.5, width: width*0.8, height: height*0.15, justifyContent: 'center', paddingLeft: 30 }}>
            <Text>
                {`${props.string} ${props.name}`}
            </Text>
        </View>
    )
}

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        OneSignal.init("50bb5eda-2327-49f1-b1a7-31f8ce7f9b1b");
        this.state = {
            loaded: false,
            user: {},
            selected: 1
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('user')
            .then(user => {
                this.setState({user: JSON.parse(user), loaded: true })
            })
        axiosInstance.get(`${BASE_URL}/donations/find`)
            .then(({ data }) => {
                this.setState({data});
            })
            .catch(error=>console.log(error))
    }
    renderList = () => {
        if(this.state.data&&this.state.data.received.length) {
            if(this.state.selected === 1) {
                return (
                    <FlatList
                        data={this.state.data.donated}
                        keyExtractor={(item, index) => item._id}
                        renderItem={({ item }) => {
                            return <TransactionCard name={item.recipient.name} string='Donated To' />
                        }}
                    />
                )
            } else {
                return (
                    <FlatList
                        data={this.state.data.received}
                        keyExtractor={(item, index) => item._id}
                        renderItem={({ item }) => {
                            return <TransactionCard name={item.donor.name} string='Donated By'/>
                        }}
                    />
                )
            }
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator />
                </View>
            )
        }
    }
    render() {
        if(this.state.loaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.name}>
                            {this.state.user.name}
                        </Text>
                    </View>
                    <View style={styles.selection}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ selected: 1 })}>
                            <View style={this.state.selected === 1? styles.selectionContainer: styles.notselectionContainer}>
                                <Text>Donations</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({ selected: 2 })}>
                            <View style={this.state.selected === 2? styles.selectionContainer: styles.notselectionContainer}>
                                <Text>Receives</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.list}>
                        {this.renderList()}
                    </View>
                </SafeAreaView>
            )
        } else {
            return(
                <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        paddingTop: 30,
    },
    name: {
        fontSize: 18
    },
    header: {
        height: height*0.1
    },
    donationsContainer: {
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: '#3d3d3d'
    },
    selection: {
        flexDirection: 'row',
        height: height*0.05
    },
    selectionContainer: {
        flex: 0.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5,
        borderColor: '#3C3C3C'
    },
    notselectionContainer: {
        flex: 0.5, justifyContent: 'center', alignItems: 'center'
    }
})