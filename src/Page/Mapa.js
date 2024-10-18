import {View, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";



export function Mapa()
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
   