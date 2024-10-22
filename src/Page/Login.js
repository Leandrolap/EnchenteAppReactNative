
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';

export function Login(){

    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);

    const animationRef = useRef(null);

    useEffect(() => {
        animationRef.current?.play();
}, []);

    return(
        <View style={styles.container}>
            <View>
               <LottieView ref={animationRef} 
               source={require('../Image/Animation.json')} 
               loop={false} style={{height: 230}} />
            </View>

            <View style={styles.componentes}>
            <TextInput label="Email"
                       value={email}
                       onChangeText={text => setEmail(text)}
                       mode='outlined'/>

            <TextInput mode="outlined"
                       label="Senha"
                       secureTextEntry={!showPassword} // Alterna entre mostrar ou ocultar a senha
                       right={
                        <TextInput.Icon
                            icon={showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}/>}
                        value={senha}
                        onChangeText={text => setSenha(text)}/>
            </View>

            <View style={styles.componentes}>
                <TouchableOpacity style={styles.itens}>
                    <Text style={{fontSize: 15, fontWeight: 'light', color: 'red'}}>
                        Crie uma conta
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itens}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20
    },
    componentes: {
        gap: 26,
      justifyContent: 'space-around',
      marginTop: 60
      
    },
    itens:{
        alignItems: 'center',
    },
  });