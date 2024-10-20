import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?lat={-19.9342715}&lon={-43.953214}&appid={520d989014dc023d68abe1a1126e18a5}'
      );
      setWeatherData(response.data);
      console.log(response.data); // Você pode ver todos os dados do clima no console
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (text) => {
    setCity(text);
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={handleInputChange}
      />
      <Button title="Get Weather" onPress={handleSubmit} />
      {weatherData ? (
        <View>
          <Text style={styles.title}>{weatherData.name}</Text>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
          <Text>Feels like : {weatherData.main.feels_like}°C</Text>
          <Text>Humidity : {weatherData.main.humidity}%</Text>
          <Text>Pressure : {weatherData.main.pressure}</Text>
          <Text>Wind Speed : {weatherData.wind.speed}m/s</Text>
        </View>
      ) : (
        <Text>Loading weather data...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});