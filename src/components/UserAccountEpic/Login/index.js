import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Platform, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { getUserData } from '../../../redux/selector';


function Login() {
    const [stayConnected, setStayConnected] = useState(true);
    const [loginError, setLoginError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const userData = useSelector(getUserData); // peut etre pas besoin d'avoir les données de l'utilisateur içi ????

    let username;
    let password;
    let urlServer;
    let apiKey;

    return (
        <View style={styles.main}>
            <View style={styles.boxLogo}>
                <Image style={styles.logo} source={require('../../../../assets/logo.png')}/>
                <Image style={styles.logoP2} source={require('../../../../assets/logo_part2-2.png')}/>
            </View>
            <ScrollView style={styles.inputBox}>
                <KeyboardAwareScrollView>
                    <View>
                        {
                            loginError ? 
                            <Text style={styles.welcomeError}>Les informations renseignées sont incorrects, merci de corriger cela !</Text> :
                            <Text style={styles.welcome}>Bienvenue !</Text>
                        }
                        {
                            isLoading ?
                            <ActivityIndicator animating size="large"/> :
                            <>
                                <Text style={styles.titleInput} >Nom d'utilisateur</Text>
                                <TextInput style={styles.inputArea} onChangeText={(text) => username = text}/>
                                <Text style={styles.titleInput} >Mot de passe</Text>
                                <TextInput
                                    style={styles.inputArea}
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    textContentType='password'
                                    onChangeText={(text) => password = text}
                                />
                                <Text style={styles.titleInput} >URL du serveur</Text>
                                <TextInput
                                    style={styles.inputArea}
                                    autoCapitalize='none'
                                    onChangeText={(text) => urlServer = text}
                                />
                                <Text style={styles.titleInput} >Clé API</Text>
                                <TextInput
                                    style={styles.inputArea}
                                    autoCapitalize='none'
                                    onChangeText={(text) => apiKey = text}
                                />
                                <View style={styles.stayConnected}>
                                    <Text>Rester connecté ? </Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#0d96d1" }}
                                        thumbColor={Platform.OS === 'ios' ? 'white' : stayConnected ? "rgb(228,228,228)" : "#f4f3f4"}
                                        onValueChange={() => setStayConnected(!stayConnected)}
                                        value={stayConnected}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.buttonLogin}
                                    onPress={() => {}}
                                >
                                    <View style={styles.blocButtonLogin}>
                                        <Text style={styles.textButtonLogin}>CONNEXION</Text>
                                        <MaterialCommunityIcons
                                            name="arrow-right-drop-circle-outline"
                                            size={25}
                                            color="white"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'rgb(228,228,228)'
    },
    boxLogo: {
        flex: 0.5,
        alignItems: "center"
    },
    logo: {
        marginTop: 20,
        marginBottom: 20,
    },
    inputBox: {
        flex: 1,
        // justifyContent: "center",
        marginTop: '10%',
        backgroundColor: 'white',
        paddingHorizontal: 50,
        borderTopStartRadius: 35,
        borderTopEndRadius: 35
    },
    welcome: {
        marginTop: '4%',
        marginBottom: '4%',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    welcomeError: {
        marginTop: '4%',
        marginBottom: '4%',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
    titleInput: {
        color: '#737373',
    },
    inputArea: {
        width: '100%',
        padding: 5,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    stayConnected: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Platform.OS === 'ios' ? '7%' : '3%',
    },
    buttonLogin: {
        alignSelf: 'center',
        width: '70%',
        backgroundColor: '#0d96d1',
        padding: 13,
        borderRadius: 30,
    },
    blocButtonLogin: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textButtonLogin: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: '500',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default Login;