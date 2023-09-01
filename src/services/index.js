import axios from 'axios';
import $router from '@/router'

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
            $router.go();
        }
    }
);

let Clients = {
    async getClients(username) {
        let response = await Service.get(`/clients/username/${username}`);
        return response.data.map(doc => {
            return {
                id: doc._id,
                clientName: doc.clientName
            }
        })
        
    },
    async getOne(id) {
        let response = await Service.get(`/clients/${id}`);
        let doc = response.data;
        return {
            id: doc._id,
            oib: doc.oib,
            clientName: doc.clientName,
            address: doc.address,
            city: doc.city
        };
    }, 
    add(newClient) {
        return Service.post('/clients', newClient);
    }

}

let Suppliers = {
    async getSuppliers(clientId) {
        let response = await Service.get(`/suppliers/${clientId}`)
        return response.data.map(doc => {
            return {
                id: doc._id,
                supplierName: doc.supplierName,
                oib: doc.oib,
                address: doc.address,
                city: doc.city
            }
        })
    },
    add(newSupplier) {
        return Service.post('/suppliers', newSupplier);
    }
}

let Buyers = {
    async getBuyers(clientId) {
        let response = await Service.get(`/buyers/${clientId}`)
        return response.data.map(doc => {
            return {
                id: doc._id,
                buyerName: doc.buyerName,
                oib: doc.oib,
                address: doc.address,
                city: doc.city
            }
        })
    },
    add(newBuyer) {
        return Service.post('/buyers', newBuyer);
    }
}

let Ura = {
    async getAll(clientId) {
        let response = await Service.get(`/ura/${clientId}`)
        return response.data.map(doc => {
            return {
                id: doc._id,
                rbr: doc.rbr,
                rac: doc.rac,
                date: doc.date,
                supplier: doc.supplier,
                oib: doc.oib,
                address: doc.address,
                city: doc.city,
                zeroPDV:doc.zeroPDV,
                five: doc.five,
                fiveCan:doc.fiveCan,
                fiveCannot:doc.fiveCannot,
                thirteen:doc.thirteen,
                thirteenCan:doc.thirteenCan,
                thirteenCannot:doc.thirteenCannot,
                twentyfive:doc.twentyfive,
                twentyfiveCan:doc.twentyfiveCan,
                twentyfiveCannot:doc.twentyfiveCannot,
                total:doc.total
            }
        })
    },
    add(newUra) {
        return Service.post('/ura', newUra);
    }

}

let Auth = {
    async register(username, firstname, mail, password) {
        let response = await Service.post('/users', {
            username: username,
            name: firstname,
            mail: mail,
            password: password,
        });

        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));

        return true;
    },
    async login(username, password) {
        let response = await Service.post('/auth', {
            username: username,
            password: password,
        });

        let user = response.data;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('username', username);
        return true;
    },
    logout() {
        localStorage.removeItem('user');
    },
    //izvlači korisnika iz localStorage-a
    getUser() {
        return JSON.parse(localStorage.getItem('user'));  //vraća ga u objekt iz stringa
    }
    ,
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
            if (user) {
                return user.username;
            }
            return false;
        },
    },
};

export {Service, Auth, Clients, Suppliers, Ura, Buyers}