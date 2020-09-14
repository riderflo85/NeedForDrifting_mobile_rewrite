import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ItemServer from '../ItemServer';
import { fetchServers } from '../../../api/acServer';
import { getAllServers, getUserData } from '../../../redux/selector';


function ListServers(props) {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = props.navigation;

    const dispatch = useDispatch();
    const servers = useSelector(getAllServers);
    const userData = useSelector(getUserData);

    useEffect(() => {
        fetchServers(dispatch, userData.urlServer, userData,
            () => setIsLoading(false),    
        );
    }, []);

    const _renderItem = ({item}) => {
        return <ItemServer
            server={item}
            navigation={navigation}
            displayServerDetail={_displayServerDetail}
        />
    }

    const _displayServerDetail = (idServer) => {
        navigation.navigate('Detail server', {idServer: idServer});
    }

    const _displayServers = () => {
        if (servers.length > 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Vos Serveurs !</Text>
                    <FlatList
                        style={styles.listingServerBloc}
                        data={servers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={_renderItem}
                    />
                </View>
            );
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
                <View style={styles.loading}>
                    <Text style={styles.textLoading}>Chargement de vos serveur en cours...</Text>
                    <ActivityIndicator animating size="small"/>
                </View> :
                _displayServers()
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLoading: {
        marginBottom: 20,
        fontSize: 16
    },
});

export default ListServers;