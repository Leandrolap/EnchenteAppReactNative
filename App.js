import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import { Mapa } from './src/Page/Mapa';
import { NovaOcorrencia } from './src/Page/NovaOcorrencia';
import { CustomDrawer } from './src/Componentes/CustomDrawer';
import { Previsao } from './src/Page/Previsao';
import { Login } from './src/Page/Login'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Drawer.Navigator initialRouteName='Inicio' drawerContent={CustomDrawer}>
      <Drawer.Screen name='Inicio' component={Mapa}/>
      <Drawer.Screen name='Ocorrencia' component={NovaOcorrencia}/>
      <Drawer.Screen name='Previsão do Tempo' component={Previsao}/>
      <Drawer.Screen name='login' component={Login}/>
     </Drawer.Navigator>
    </NavigationContainer>
  )
}
