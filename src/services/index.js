import axios from 'axios';

// instanca axios-a 
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000
});

//prije svakog poslanog requesta na backend izvrši:
Service.interceptors.request.use((request) => {
    try {
        request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
    } catch (e) {
        console.error(e);
    }
    return request;
});

//nakon svakog odgovora s backend-a izvrši:
Service.interceptors.response.use(
    (response) => {
        console.log('Interceptor', response);
        return  response;
    },
    (error) => {
        if (error.response.status == 401) {
            Auth.logout();
        }
    }
);

let Auth = {
    async register(username, mail, password) {
        let response = await Service.post('/registration', {
            username: username,
            mail: mail,
            password: password,
        });

        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    async login(username, password) {
        let response = await Service.post('/login', {
            username: username,
            password: password,
        });

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    logout() {
        localStorage.removeItem('user');
    },
    //izvlači korisnika iz localStorage-a
    getUser() {
        return JSON.parse(localStorage.getItem('user'));  //vraća ga u objekt iz stringa
    },
    getToken() {
        let user = Auth.getUser();
        if (user && user.token) {
            return user.token;
        }
        else {
            return false;
        }
    },
    //provjerava da li smo autentificirani
    authenticated() {
        let user = Auth.getUser();
        if (user && user.token) {
            return true;
        }
        return false;
    },
    state: {
        get authenticated() {
            return Auth.authenticated();
        },
        get username() {
            let user = Auth.getUser();
            console.log(user);
            if (user) {
                return user.username;
            }
            return false;
        },
    },
};

export {Auth}