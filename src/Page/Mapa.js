import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MarkerIcon from "../Image/cloudy.png"

export function Mapa()
{
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
               //image={marker.image}
             />
           ));
         };

    return(       
        <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: -19.9194405,
            longitude: -43.9395354,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >

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
   