import React, { Component } from 'react';
import { SafeAreaView, View, Button, StyleSheet, Image, Alert, Text, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Input from '../Components/input';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            name: '',
            password2: '',
            email: ''
        }
    }
    trylogging() {
        let { phone, password, name, password2 } = this.state;
        if(phone.length < 10 || name.length == 0 || password.length < 5 || password2.length < 5 || email.length < 2)
            Alert.alert('Invalid Data', 'Please check all the fields have valid date');
        else if(password !== password2)
            Alert.alert('Password Mismatch', 'The two passwords do not match');
        else
            this.state.navigation.navigate('Login');
            
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
                        <View style={{ flex: 0.8, justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text
                                style={{ fontSize: 30, margin: 30 }}
                            >
                                Signup
                            </Text>
                            <Input
                                header='Name'
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            />
                            <Input
                                header='Phone Numer'
                                keyboardType='phone-pad'
                                maxLength={10}
                                onChangeText={(phone) => this.setState({ phone })}
                                value={this.state.phone}
                            />
                            <Input
                                header='Email'
                                keyboardType='email-address'
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                            <Input
                                header='Password'
                                secureTextEntry
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                            />
                            <Input
                                header='Confirm Password'
                                secureTextEntry
                                onChangeText={(password2) => this.setState({ password2 })}
                                value={this.state.password2}
                            />
                        </View>
                        <View style={{ flex: 0.2, margin: 40 }}>
                            <Button
                                title='Sign In'
                                onPress={this.trylogging.bind(this)}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => this.props.navigation.navigate('Login')} 
                            >
                                <View style={{ marginTop: 20, alignItems: 'center' }}>
                                    <Text>
                                        Already a member?
                                        <Text style={{ color: 'blue' }}>
                                            {' Login'}
                                        </Text>
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center'
    },
})