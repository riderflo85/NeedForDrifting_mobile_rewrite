import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';

import { getUserData } from '../../../redux/selector';


function Settings(props) {
    const [btnValideUsername, setBtnValideUsername] = useState(false);
    const [btnValideUrl, setBtnValideUrl] = useState(false);
    const [btnValideToken, setBtnValideToken] = useState(false);

    const userData = useSelector(getUserData);

    let usernameInput;
    let urlInput;
    let tokenInput;


    const _displayInputData = (type) => {
        const iconCheck = <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={25} color="#23903c"/>;
        const iconClose = <MaterialCommunityIcons name="close-circle-outline" size={25} color="#c32232"/>;
        const iconEdit = <MaterialCommunityIcons name="square-edit-outline" size={25} color="#0d96d1"/>;
        
        if (type === 'username') {
            const subStyles = [styles.section, {marginBottom: 10}];
            const icon = <MaterialCommunityIcons name="account" size={25} color="grey"/>;

            if (btnValideUsername) {
                return (
                    <View style={subStyles}>
                        {icon}
                        <TextInput
                            style={styles.input}
                            placeholder="Saisissez votre nom d'utilisateur"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={24}
                            onChangeText={(text) => {usernameInput = text}}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => setBtnValideUsername(false)}>
                                {iconClose}
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => setBtnValideUsername(false)}>
                                {iconCheck}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={subStyles}>
                        {icon}
                        <Text>{userData.username}</Text>
                        <TouchableOpacity onPress={() => setBtnValideUsername(true)}>
                            {iconEdit}
                        </TouchableOpacity>
                    </View>
                );
            }

        } else if (type === 'urlServer') {
            const subStyles = [styles.section, {paddingVertical: 10}, styles.separator];
            const icon = <MaterialCommunityIcons name="server" size={25} color="grey"/>;

            if (btnValideUrl) {
                return (
                    <View style={subStyles}>
                        {icon}
                        <TextInput
                            style={styles.input}
                            placeholder="Saisissez l'url de votre serveur"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={150}
                            onChangeText={(text) => {urlInput = text}}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => setBtnValideUrl(false)}>
                                {iconClose}
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => setBtnValideUrl(false)}>
                                {iconCheck}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={subStyles}>
                        {icon}
                        <Text>{userData.urlServer}</Text>
                        <TouchableOpacity onPress={() => setBtnValideUrl(true)}>
                            {iconEdit}
                        </TouchableOpacity>

                    </View>
                );
            }

        } else if (type === 'token') {
            const icon = <MaterialCommunityIcons name="key-variant" size={25} color="grey"/>;
            const subStyles = [styles.section, {marginTop: 10}];

            if (btnValideToken) {
                return (
                    <View style={subStyles}>
                        {icon}
                        <TextInput
                            style={styles.input}
                            placeholder="Saisissez votre nouvelle clé API"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={24}
                            onChangeText={(text) => {tokenInput = text}}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => setBtnValideToken(false)}>
                                {iconClose}
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => setBtnValideToken(false)}>
                                {iconCheck}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={subStyles}>
                        {icon}
                        <Text>{userData.token}</Text>
                        <TouchableOpacity onPress={() => setBtnValideToken(true)}>
                            {iconEdit}
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    };

    return (
        <View style={[styles.container, styles.main]}>
            <View style={[styles.borderAndColorBloc, styles.dataInput]}>
                {_displayInputData('username')}
                {_displayInputData('urlServer')}
                {_displayInputData('token')}
            </View>
            <View style={{marginBottom: 25}}>
                <Button title="Déconnexion" color="#c32232"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'space-between',
        paddingTop: 40
    },
    section: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    separator: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgb(228,228,228)',
    },
    input: {
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(228,228,228)',
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(228,228,228)',
        paddingHorizontal: 15,
    },
    borderAndColorBloc: {
        backgroundColor: 'white',
        borderRadius: 20,
    },
    dataInput: {
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
    },
});


export default Settings;