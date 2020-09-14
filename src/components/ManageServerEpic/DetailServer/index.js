import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';

import { getAllTracks, getUserData } from '../../../redux/selector';
import { fetchTracks, runCommand } from '../../../api/acServer';


function DetailServer(props) {
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const [isLoadingContent, setIsLoadingContent] = useState(false); // true is default
    const [status, setStatus] = useState(undefined);
    const dispatch = useDispatch();

    const userData = useSelector(getUserData);
    const tracks = useSelector(getAllTracks);
    const server = props.route.params.server[0];

    useEffect(() => {
        fetchTracks(dispatch, userData.urlServer, userData,
            () => setIsLoadingContent(false),
        );
    }, []);


    const _stateServer = () => {
        let colorLight = 'white';

        if (status === 'error' || server.status === 'error') {
            colorLight = '#9900ff';
        } else if (status === 'running' || server.status === 'running') {
            colorLight = '#009900';
        } else if (status === 'stoping' || server.status === 'stoping') {
            colorLight = '#ff2418';
        }

        return <View style={[styles.stateServerColor, {backgroundColor: colorLight}]}></View>;
    };

    const _runCommandServer = (cmd) => {
        runCommand(dispatch, userData.urlServer, userData, server.id, cmd,
            () => setIsLoadingAction(false),
            (newStatus) => setStatus(newStatus)
        );
    }

    return (
        <View style={styles.container}>
            {
                isLoadingContent ?
                <View style={styles.loadingContent}>
                    <ActivityIndicator animating size='large'/>
                </View> :
                <ScrollView contentContainerStyle={{flex: 1}}>
                {/* <ScrollView contentContainerStyle={{flex: 1}} refreshControl={
                    <RefreshControl refreshing={() => {}} onRefresh={() => {}}/>
                }> */}
                    <KeyboardAwareScrollView>
                        <View style={[styles.borderAndColorBloc, styles.dataServer]}>
                            <View style={styles.headerBloc}>
                                <View style={{justifyContent: 'center', marginRight: 10}}>
                                    <MaterialCommunityIcons name="traffic-light" size={45} color="black"/>
                                    {_stateServer()}
                                </View>
                                <Text style={styles.titleServer}>{server.name}</Text>
                            </View>
                            <View style={styles.bodyBloc}>
                                <View style={styles.iconsView}>
                                    <MaterialCommunityIcons style={{marginBottom: 15}} name="file-outline" size={25} color="#053448"/>
                                    <MaterialCommunityIcons style={{marginBottom: 15}} name="car" size={25} color="#053448"/>
                                    <MaterialCommunityIcons style={{marginBottom: 15}} name="go-kart-track" size={25} color="#053448"/>
                                </View>
                                <View style={styles.dataView}>
                                    <Text style={{marginBottom: 15, flexWrap: 'wrap'}}>/home/acServer/acServerPro/bin/savegame/cfg/linux/init.cfg</Text>
                                    <Text style={{marginBottom: 15}}>/home/acServer/acServerPro/bin/savegame/cfg/linux/car.list</Text>
                                    <Text style={{marginBottom: 15}}>{server.status}</Text>
                                </View>
                            </View>
                        </View>
                        {/* <UpdateTrack updateTracks={this.tracks} server={this.state.server}/> */}
                        {
                            isLoadingAction ?
                            <View style={[styles.borderAndColorBloc, styles.actionServer]}>
                                <ActivityIndicator size="small"/>
                            </View> :
                            <View style={[styles.borderAndColorBloc, styles.actionServer]}>
                                <TouchableOpacity 
                                    style={[styles.buttonAction, {backgroundColor: '#16a0b6', borderWidth: 3, borderColor: '#148c9f'}]}
                                    onPress={() => _runCommandServer('status')}
                                >
                                    <MaterialCommunityIcons name="information-outline" size={30} color="white"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonAction, {backgroundColor: '#28a745', borderWidth: 3, borderColor: '#23903c'}]}
                                    onPress={() => _runCommandServer('start')}
                                >
                                    <MaterialCommunityIcons name="play-speed" size={30} color="white"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonAction, {backgroundColor: '#ffc107', borderWidth: 3, borderColor: '#e6ac00'}]}
                                    onPress={() => _runCommandServer('restart')}
                                >
                                    <MaterialCommunityIcons name="restart" size={30} color="white"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonAction, {backgroundColor: '#dc3545', borderWidth: 3, borderColor: '#c32232'}]}
                                    onPress={() => _runCommandServer('stop')}
                                >
                                    <MaterialCommunityIcons name="stop-circle-outline" size={30} color="white"/>
                                </TouchableOpacity>
                            </View>
                        }
                    </KeyboardAwareScrollView>
                </ScrollView>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(228,228,228)',
        paddingHorizontal: 15,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderAndColorBloc: {
        backgroundColor: 'white',
        borderRadius: 20,
    },
    dataServer: {
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    headerBloc: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    titleServer: {
        flex: 1,
        fontSize: 21,
    },
    stateServerColor: {
        width: 10,
        height: 31,
        position: "absolute",
        top: '17%',
        left: 18,
        zIndex: -10
    },
    bodyBloc: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    iconsView: {
        justifyContent: 'space-between'
    },
    dataView: {
        flex: 1,
        marginLeft: 5,
        justifyContent: 'space-around'
    },
    actionServer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 30,
        marginHorizontal: '10%'
    },
    buttonAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 10,
    },
});

export default DetailServer;