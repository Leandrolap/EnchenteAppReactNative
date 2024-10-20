import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import Textarea from 'react-native-textarea';

export function NovaOcorrencia()
{
    const [selectedTitulo, setSelected] = React.useState("");
    const [textDescricao, setDescricao] = React.useState("");

    const data = [
        {key:'1', value:'Alagamento',},
        {key:'2', value:'Deslizamento'},]

    return(
        <View style={{flex: 1, padding: 10, justifyContent: 'space-around', alignItems: 'center'}}>
            <View>
                <Image source={require('../Image/umbrella.png')}
                       style={{height: 150, width: 150}}/>
            </View>

            <View>
                <Text>
                    Escolha uma opção abaixo:
                </Text>
                <SelectList setSelected={(val) => setSelected(val)} 
                            data={data} 
                            save="value"/>
            </View>

            <Textarea containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={this.onChange}
                    defaultValue={textDescricao}
                    maxLength={120}
                    placeholder={'Adicione uma descrição'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}/>

            <TouchableOpacity style={{backgroundColor: '#fb1c0a', padding: 10, borderRadius: 5, width: 60, alignItems: 'center', width: 150}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
    },
  });