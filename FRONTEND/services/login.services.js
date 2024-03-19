const URL_API = "http://localhost:7000";

const LoginService = {
    apiAuthUser: (user) => {
      return new Promise((resolve, reject) => {
        fetch(`${URL_API}/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              resolve('Usuário autenticado com sucesso');
            } else {
              reject(data.error);
            }
          })
          .catch(error => {
            reject('Erro na requisição AJAX:', error);
          });
      });
    },
  };
  
  export {LoginService}