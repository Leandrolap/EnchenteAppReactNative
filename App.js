import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet} from 'react-native';

import { Mapa } from './src/Page/Mapa';
import { MenuDrawer } from './src/Page/MenuDrawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer style={styles.container} />
    </NavigationContainer>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
    drawerContent={MenuDrawer}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#2a2829',
        },

        drawerActiveBackgroundColor: '#000000',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#ffffff'
      }}
    >
      <Drawer.Screen name="Início" component={Mapa} screenOptions={{fontsize: 30, title: 'Mapa'}}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
