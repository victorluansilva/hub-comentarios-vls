import decodeJWT from '../lib/decodeJWT.js';
import User  from "../model/user.model.js";
const URL_API = "http://localhost:7000/session";

const AuthService = {
  apiAuthUser: (user) => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // document.cookie = `token=${data.token}`;
            sessionStorage.setItem('token', data.token);
            resolve('Usuario logado com sucesso');
          } else {
            reject(data.error);
          }
        })
        .catch(error => {
          reject('Erro na requisição de login. Error:', error);
        });
    });
  },
  tokenToHeader:(headers) =>{
    const token = sessionStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  ,
  getUserSession: () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = decodeJWT(token);
      if (payload) {
        const user = new User(payload.id, payload.username, payload.password, payload.firstname, payload.lastname, payload.imgLink)
        return user;
      } else {
        return null;
      }
    }
  }, 
  updateSessionUserData(user) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.tokenToHeader(headers)
      fetch(`${URL_API}/update`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            document.cookie = `token=${data.token}`;
            sessionStorage.setItem('token', data.token);
            resolve('Seus dados foram atualizados com sucesso!');
          } else {
            reject(data.error);
          }
        }).catch(err => {
          reject(err);
        });
    })
  },
  isUserLoggedIn: () => {
    // const token = sessionStorage.getItem('token');
    // if (!token) {
    //   return false;
    // }
    // try {
    //   const tokenExpireTime = (decodeJWT(token).exp * 1000);
    //   if (Date.now() >= tokenExpireTime) {
    //     return false;
    //   }
    //   return true;
    // } catch (error) {
    //   console.log(error);
    // }
    return true;
  },
  logoutUser: () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            resolve();
          } else {
            reject('Erro ao fazer logout. Tente novamente.');
          }
        })
        .catch(error => {
          reject('Erro na requisição AJAX:', error);
        });
    });
  }
};

export default AuthService