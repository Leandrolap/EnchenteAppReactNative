import {View, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import { FloatingAction } from "react-native-floating-action";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NovaOcorrencia } from './NovaOcorrencia';


export function Mapa({navigation})
{

  const [location, setLocation] = useState(null)

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()

    if(status === 'granted') {
      let location = await Location.getCurrentPositionAsync()
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      })
    }
  }

    const markers = [
           {
             coordinate: {
               latitude: -19.9228127,
               longitude: -43.9452717,
             },
             title: "Praça Raul Soares",
            
             description:
               "Praça localizada no bairro Barro Preto.",
           },
           {
             coordinate: {
               latitude: -19.9172582,
               longitude: -43.9333732,
             },
             title: "Praça da Estação",
             description:
               "Primeira estação da cidade.",
           },
           // Add more markers as needed
         ];
        
         const renderMarkers = () => {
           return markers.map((marker, index) => (
             <Marker
               key={index}
               coordinate={marker.coordinate}
               title={marker.title}
               description={marker.description}
               image={require('../Image/kid.png')}
             />
           ));
         };

         const actions = [
          {
            text: "Nova Ocorrência",
            icon: require("../Image/kid.png"),
            name: "bt_nova_ocorrencia",
            position: 1
          },
          {
            text: "Ligação de Emergência",
            icon: require("../Image/kid.png"),
            name: "bt_ligacao_emergencia",
            position: 2
          }
        ];

    return(       
        <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={location}
        >
          {
          location && 
          <Marker 
            coordinate={location}
            title='Você'
            description='Você está aqui!'
          />
        }

        {renderMarkers()}

        </MapView>

        <FloatingAction
    actions={actions}
    onPressItem={name => {
      if (name === 'bt_nova_ocorrencia') {
        navigation.navigate('Ocorrencia');
      }
      // Adicione outras navegações se necessário
    }}
  />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
   