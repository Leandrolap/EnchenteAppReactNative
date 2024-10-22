
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Componentes/firebaseConnection';
import Modal from "react-native-modal";
import { Mapa } from './Mapa'

export function Login(){

    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [confSenha, setConfSenha] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const animationRef = useRef(null);
    const [authUser, setauthUser] = useState(null);

    useEffect(() => {
        animationRef.current?.play();
}, []);

    useEffect(() =>{
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user)
            {
                setauthUser({
                    email: user.user.email,
                    uid: user.user.uid
                })
            }
            return;
        })
    }, [])


    async function handleCreateUser() {
       const user = await createUserWithEmailAndPassword(auth, email, senha)
       console.log(user);
    }

    function handleLogin(){
        signInWithEmailAndPassword(auth, email, senha)
        .then((user => {
            setauthUser({
                email: user.user.email,
                uid: user.user.uid
            })

            {Mapa}
        }
      ))
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

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
                    <Text style={{fontSize: 15, fontWeight: 'light', color: 'red'}} onPress={toggleModal}>
                        Crie uma conta
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itens} onPress={handleLogin}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible} animationIn={'slideInDown'}>
            
            <View>
               

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

                <TextInput mode="outlined"
                       label="Confirmar senha"
                       secureTextEntry={!showPassword} // Alterna entre mostrar ou ocultar a senha
                       right={
                        <TextInput.Icon
                            icon={showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}/>}
                        value={confSenha}
                        onChangeText={text => setConfSenha(text)}/>                        

                <TouchableOpacity style={styles.itens} onPress={handleCreateUser}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
                        Enviar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#fb1c0a', padding: 10, borderRadius: 22, alignItems: 'center'}}
                      onPress={toggleModal}>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        Fechar
      </Text>
    </TouchableOpacity>
            </View>
        </Modal>
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