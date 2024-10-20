import {View} from 'react-native';

import { Weather } from '../Componentes/WeatherApi';

export function Previsao(){
    return(
        <View style={{flex: 1}}>
            <Weather/>
        </View>
    );
}