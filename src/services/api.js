import axios from 'axios';
import { AsyncStorage } from 'react-native';
import base64 from 'react-native-base64';
import { API_URL, CLIENT_ID, CLIENT_SECRETY } from 'react-native-dotenv';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
    
    const userToken = await AsyncStorage.getItem('userToken');
    const language = await AsyncStorage.getItem('language');
    const dashboard = await AsyncStorage.getItem('dashboard');

    config.headers = {
        "Accept": "application/json",
        "Authorization": userToken,
        "Accept-Language": language
    }

    if(dashboard) {
        config.headers.dashboard = dashboard
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, function (error) {

    if (error.response) {

        const { status, data } = error.response

        if(status === 401){
            AsyncStorage.clear();
        }

        if(status === 404){
            return Promise.reject({
                error: true,
                status: status,
                message: `Recurso não foi encontrado "${data.path}"`
            });
        }

        return Promise.reject({
            error: true,
            status: status,
            message: data.message || data.error_description
        });

    } else {
        return Promise.reject({
            error: true,
            status: 500,
            message: error.message
        });
    }

});

export const get = (url, params) => {
    return api.get(`/api/v1${url}`, params).then(({status, data}) => {
        return { status, data };
    }).catch((error) => {
        return error
    })
}

export const post = (url, params) => {
    return api.post(`/api/v1${url}`, params).then(({status, data}) => {
        return { status, data };
    }).catch((error) => {
        return error
    })
}

export const put = (url, params) => {
    return api.put(`/api/v1${url}`, params).then(({status, data}) => {
        return { status, data };
    }).catch((error) => {
        return error
    })
}

export const patch = (url, params) => {
    return api.patch(`/api/v1${url}`, params).then(({status, data}) => {
        return { status, data };
    }).catch((error) => {
        return error
    })
}

export const del = (url, params) => {
    return api.delete(`/api/v1${url}`, params).then(({status, data}) => {
        return { status, data };
    }).catch((error) => {
        return error
    })
}

export const doLogin = async (username, password) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    
    var basicAuth = 'Basic ' + base64.encode(`${CLIENT_ID}:${CLIENT_SECRETY}`);

    AsyncStorage.setItem('userToken', basicAuth);
    AsyncStorage.setItem('dashboard', '1');

    return api.post('/oauth/token', params)
                .then(async (response) => {
                    const { access_token } = response.data
                    await AsyncStorage.setItem('userToken', 'Bearer ' + access_token);
                    return Promise.resolve(response.data);
                }).catch(async (response) => {
                    return Promise.resolve(response)
                })

}

export default api;