import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {

    function signOut() {
        return auth().signOut().then(() => { return navigation.navigate('Admin Login') })
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is some text lol</Text>
            <Button title="Sign out" onPress={signOut} />
        </View>
    )
}

const AdmLogin = ({ navigation }) => {

    const [email, setEmail] = useState('arsalan@mail.com');
    const [pass, setPass] = useState('astro&%%boy');

    useEffect(() => {
        const unsub = auth().onAuthStateChanged(
            user => {
                if (user) {
                    navigation.replace('Home');
                }
            }
        )
    });

    function handleLogin() {
        auth().signInWithEmailAndPassword(email, pass).then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Registered with: ", user.email);
        })
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }


    return (
        <View>
            <View style={styleSheet.inpBox}>
                <Text>Email Name</Text>
                <TextInput placeholder="Email here" style={styleSheet.inp} onChangeText={(newEmail) => { return setEmail(newEmail) }} />
            </View>
            <View style={styleSheet.inpBox}>
                <Text>Password</Text>
                <TextInput placeholder="Password here" style={styleSheet.inp} onChangeText={(newP) => { return setPass(newP) }} />
            </View>
            <View>
                <Button title="Sign In" onPress={handleLogin} />
            </View>
            <View>
                <Text>Email is admin@mail.com and Pass is 123456789</Text>
            </View>

        </View>
    )
}

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Admin Login" >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Admin Login" component={AdmLogin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styleSheet = StyleSheet.create({
    inpBox: {
        justifyContent: 'space-around', flexDirection: 'row', padding: 10
    },
    inp: {
        height: 23,
        width: 200,
        borderColor: "blue",
        borderWidth: 2,
        padding: 3
    }

})

export default App;
