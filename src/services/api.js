import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const api = axios.create({
    baseURL: 'http://cash-house.herokuapp.com',
});

api.interceptors.request.use(async (config) => {
    
    const userToken = await AsyncStorage.getItem('userToken');
    const language = await AsyncStorage.getItem('language');
    const dashboard = await AsyncStorage.getItem('dashboard');

    config.headers = {
        //"Content-Type": "application/json",
        "Authorization": userToken,
        "Accept-Language": language
    }

    if(dashboard) {
        config.headers.dashboard = dashboard
    }

    return config;
}, function (error) {
    console.error('api.interceptors.request:', error)
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, function (error) {

    if (error.response) {

        const { status, data } = error.response

        if (status === 401) {
            AsyncStorage.clear();
            const navigation = useNavigation();
            navigation.navigate('Sign', { message: 'Credencial expirada' });
            return Promise.reject(error.message);
        }

        if (status >= 400 || status < 500) {
            if (data) {
                return Promise.reject(data);
            } else {
                return Promise.reject(error.message);
            }
        }

        if (status === 500) {
            console.log('status === 500 => response:', error.response)
            console.log('status === 500 => message:', error.message)
            return Promise.reject(error.message);
        }

    }

    return Promise.reject(error.message);
});

export default api;