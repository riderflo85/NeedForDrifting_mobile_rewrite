import React, { useState } from 'react';
import { View, Text, StatusBar, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import ItemServer from '../ItemServers';

function ListServers(props) {
    const [servers, setServers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = props.navigation;

    const _renderItem = ({item}) => {
        return <ItemServer server={item} navigation={navigation}/>
    }

    const _displayServers = () => {
        if (servers.length > 0) {
            <View style={styles.container}>
                <Text style={styles.title}>Vos Serveurs !</Text>
                <FlatList
                    style={styles.listingServerBloc}
                    data={servers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={_renderItem}
                />
            </View>
        } else {
            return (
                <View style={styles.noServerBloc}>
                    <Image source={require('../../../../assets/stickman_bad.png')}/>
                    <Text style={styles.notFoundText}>Aucun serveur Assetto n'a été trouvés !</Text>
                    <Text style={styles.textNoServerIndicateSettings}>Vérifier ou modifier l'url de votre serveur dans vos paramètres</Text>
                </View>
            );
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'rgb(228,228,228)'}}>
            <StatusBar backgroundColor="#0d96d1" barStyle="light-content"/>
            {
                isLoading ?
                <ActivityIndicator animating size="large"/> :
                _displayServers
            }
            
        </View>
    );
}


const styles = StyleSheet.create({
    noServerBloc: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    notFoundText: {
        marginVertical: 20,
    },
    textNoServerIndicateSettings: {
        flexWrap: 'wrap',
        width: '90%',
        textAlign: "center",
    },
    container: {
        marginTop: 40,
        marginHorizontal: 10,
    },
    listingServerBloc: {
        borderRadius: 20,
        backgroundColor: 'white',
    },
    title: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default ListServers;