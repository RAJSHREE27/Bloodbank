import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import axiosInstance from '../axiosInstance';
import { BASE_URL } from '../../config';

const { width, height } = Dimensions.get('window');

const BloodBank = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => {}}>
            <View style={StyleSheet.cardContainer}>
                <Text>
                    {props.user.name}
                </Text>
                <Text>
                    Hello
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default class BloodBankScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: []
        }
    }
    componentDidMount() {
        axiosInstance.get(`${BASE_URL}/bloodbank/allstocks/`)
            .then(({data}) => {
                console.log(JSON.stringify(data));
                if(data.success) {
                    this.setState({ data: data.bloodbank, loaded: true });
                } else {
                    Alert.alert('Error', 'Invalid User')
                }
            })
            .catch(error => {
                this.setState({loaded: false});
                Alert.alert('Error', 'Error fetching data');
            })
    }
    renderCard = () => {
        if(this.state.data && this.state.data.length) {
            return (
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => item._id}
                        renderItem={({ item }) => {
                            return <BloodBank data={item} />
                    }}
                />
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderCard()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 2,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
        padding: 10,
        height: height*0.05
    }
})