import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Platform, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useDispatch } from 'react-redux';

import { updateTrack } from '../../../api/acServer';


function UpdateTrack(props) {
    const tracks = props.tracks;
    const userData = props.userData;
    const idServer = props.idServer
    const [newTrackSelected, setNewTrackSelected] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    const [isLoadingUpdateTrack, setIsLoadingUpdateTrack] = useState(false);
    const dispatch = useDispatch();

    let configNewTrack = { input: undefined, value: '' };
    let maxClients = { input: undefined, value: '' };

    const _iosDisplayTrackSelected = () => {
        if (Platform.OS === 'ios') {
            return <Text style={{color: 'black'}}>{newTrackSelected.name}</Text>;
        }
    };

    const _trackSelected = (value, index) => {
        if (value !== 'null') {
            let newIndex = Platform.OS === 'ios' ? index : index - 1;
            setNewTrackSelected({
                id: tracks[newIndex].id,
                folder_name: value,
                name: tracks[newIndex].name,
            });
        }
    };

    const _trackSelector = (allServerTracks) => {
        let allTracks;
        if (allServerTracks.length === 0) {
            allTracks = tracks;
        } else {
            allTracks = allServerTracks;
            // if (allServerTracks.length !== tracks.length) {
            //     tracks = allTracks;
            // }
        }
        let pickerItem = allTracks.map((val, index) => {
            return (
                <Picker.Item label={val.name} value={val.folder_name} key={index}/>
            );
        });

        return pickerItem;
    };

    const _displayPicker = (tracks) => {
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.iosButtonChoice}>
                    <Modal animationType="fade" transparent={true} visible={displayModal} onRequestClose={() => Alert.alert('Modal closed')}>
                        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(77, 77, 77, 0.7)'}}>
                            <View style={{backgroundColor: 'rgb(255, 255, 255)', borderRadius: 20}}>
                                <View style={{height: 50}}>
                                    <Picker
                                        selectedValue={newTrackSelected.folder_name}
                                        style={{height: 50, width: '100%'}}
                                        onValueChange={_trackSelected}
                                    >
                                        {_trackSelector(tracks)}
                                    </Picker>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '40%', marginBottom: '5%'}}>
                                    <Button title="Annuler" color='red' onPress={() => {
                                        setDisplayModal(false);
                                        setNewTrackSelected('');
                                    }}/>
                                    <Button title="Valider" onPress={() => setDisplayModal(false)}/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Button onPress={() => setDisplayModal(true)} title="Choisir une piste"/>
                </View>
            );
        } else {
            return (
                <Picker
                    selectedValue={newTrackSelected.folder_name}
                    style={{height: 50, width: '100%', marginVertical: 10}}
                    onValueChange={_trackSelected}
                >
                    <Picker.Item label="Choisissez une piste" value="null"/>
                    {_trackSelector(tracks)}
                </Picker>
            );
        }
    };

    const _displayAlert = () => {

        if (newTrackSelected != '') {
            if (maxClients.value != '') {
                const status = updateTrack(
                    dispatch,
                    userData.urlServer,
                    userData,
                    idServer,
                    newTrackSelected.id,
                    newTrackSelected.name,
                    configNewTrack.value,
                    maxClients.value,
                    () => {setIsLoadingUpdateTrack(true)},
                );
                status.then(() => {
                    Alert.alert(
                        'Information',
                        'Le changement de la piste ne redémarre pas le serveur !!!',
                        [
                            {
                                text: "OK"
                            }
                        ],
                        { cancelable: false }
                    );
                    setIsLoadingUpdateTrack(false);
                    setNewTrackSelected('');
                });

            } else {
                Alert.alert(
                    'Formulaire non valide !',
                    'Merci de préciser le nombre de clients maximum !!!',
                    [
                        {
                            text: "OK"
                        }
                    ],
                    { cancelable: false }
                );
            }
        } else {
            Alert.alert(
                'Formulaire non valide !',
                'Merci de séléctionner une piste parmit la liste !!!',
                [
                    {
                        text: "OK"
                    }
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <View style={[styles.borderAndColorBloc, styles.main]}>
            {
                isLoadingUpdateTrack ?
                <ActivityIndicator animating size="small"/> :
                <View>
                    <Text style={styles.titleBloc}>Changer la piste du serveur !</Text>
                    <Text style={styles.titleInput}><Text style={{color: '#dc3545'}}>*</Text>Nom de la piste : {_iosDisplayTrackSelected()}</Text>
                    {_displayPicker(tracks)}
                    <Text style={styles.titleInput}>Configuration de la piste (Sous piste) :</Text>
                    <TextInput
                        style={styles.inputArea}
                        onChangeText={(text) => configNewTrack.value = text}
                        ref={input => {configNewTrack.input = input}}
                    />
                    <Text style={styles.titleInput}><Text style={{color: '#dc3545'}}>*</Text>Client max (PitBox) :</Text>
                    <TextInput
                        style={styles.inputArea}
                        keyboardType="decimal-pad"
                        onChangeText={(text) => maxClients.value = text}
                        ref={input => {maxClients.input = input}}
                    />
                    <View style={styles.footerBloc}>
                        <Text style={{alignSelf: 'flex-end', color: '#737373'}}><Text style={{color: '#dc3545'}}>*</Text>Champs obligatoires</Text>
                        <TouchableOpacity style={styles.valideButton} onPress={_displayAlert}>
                            <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        padding: 15,
        marginBottom: 20,
    },
    titleBloc: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    iosButtonChoice: {
        marginVertical: 20,
    },
    footerBloc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    valideButton: {
        width: '30%',
        padding: 6,
        backgroundColor: '#28a745',
        borderRadius: 17,
        justifyContent: 'center',
    },
    borderAndColorBloc: {
        backgroundColor: 'white',
        borderRadius: 20,
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
});


export default UpdateTrack;