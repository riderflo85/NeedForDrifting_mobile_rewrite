import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function ItemServer(props) {
    const server = props.server;


    const _getStateServer = () => {
        let colorLight = 'white';

        if (server.status === 'running') {
            colorLight = '#009900';
        } else if (server.status === 'stoping') {
            colorLight = '#ff2418';
        } else {
            colorLight = '#9900ff';
        }
        return <View style={[styles.stateServerColor, {backgroundColor: colorLight}]}></View>
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {props.displayServerDetail(server.id)}}
        >
            <View style={styles.section}>
                <View style={styles.stateServerBloc}>
                    <MaterialCommunityIcons name="traffic-light" size={30} color="black"/>
                    {_getStateServer()}
                </View>
                <View style={styles.nameServer}>
                    <Text>{server.name}</Text>
                </View>
                <View style={styles.rightArrow}>
                    <MaterialCommunityIcons name={Platform.OS === 'ios' ? "chevron-right" : "arrow-right"} size={25} color="#0d96d1"/>
                </View>
            </View>
            <View style={styles.separator}></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    stateServerBloc: {
        justifyContent: 'center'
    },
    stateServerColor: {
        width: 8,
        height: 20,
        position: "absolute",
        top: '9%',
        left: 11.2,
        zIndex: -10
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(228,228,228)'
    },
});

export default ItemServer;