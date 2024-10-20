import { View, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { FloatingAction } from 'react-native-floating-action';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Componentes/firebaseConnection';

export function Mapa({ navigation }) {
  const [location, setLocation] = useState(null);
  const [ocorrencias, setOcorrencias] = useState([]);
  const mapRef = useRef(null);

  const showToast = () => {
    ToastAndroid.show('Mapa atualizado', ToastAndroid.SHORT);
  };

  useEffect(() => {
    getLocation();
    getDados();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync();
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      };
      setLocation(newLocation);
    } else {
      console.log("Permissão de localização não concedida");
    }
  };

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(location, 1000);
      console.log("Mapa centralizado na localização do usuário");
    }
  }, [location]);

  const getDados = async () => {
    try {
      const usersRef = collection(db, 'ocorrencia');
      const snapshot = await getDocs(usersRef);
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          descricao: doc.data().descricao,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
        });
      });
      setOcorrencias(lista);
    } catch (err) {
      console.log(err);
    }
  };

  const renderMarkers = () => {
    return ocorrencias.map((marker, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
        }}
        title={marker.titulo}
        description={marker.descricao}
        image={require('../Image/kid.png')} // Ajuste o caminho conforme necessário
      />
    ));
  };

  const actions = [
    {
      text: 'NOVA OCORRÊNCIA',
      icon: require('../Image/kid.png'),
      name: 'bt_nova_ocorrencia',
      position: 1,
    },
    {
      text: 'CONTATO DE EMERGÊNCIA',
      icon: require('../Image/kid.png'),
      name: 'bt_ligacao_emergencia',
      position: 2,
    },
    {
      text: 'ATUALIZAR MAPA',
      icon: require('../Image/kid.png'),
      name: 'bt_atualizar_mapa',
      position: 3,
    },
    {
      text: 'MINHA LOCALIZAÇÃO',
      icon: require('../Image/kid.png'),
      name: 'bt_minha_localizacao',
      position: 4,
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
      >
        {location && (
          <Marker coordinate={location} title="Você" description="Você está aqui!" />
        )}
        {renderMarkers()}
      </MapView>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === 'bt_nova_ocorrencia') {
            navigation.navigate('Ocorrencia');
          } else if (name === 'bt_atualizar_mapa') {
            getDados();
            showToast();
          } else if (name === 'bt_minha_localizacao') {
            getLocation();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});