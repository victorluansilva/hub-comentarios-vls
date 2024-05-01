import LoginService from "../services/login.service.js";

const URL_API = "http://localhost:7000";

const CommentService = {
  apiGetComment: () => {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      }
      LoginService.tokenToHeader(headers)
      fetch(`${URL_API}/comment`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            resolve(data.comment);
          } else {
            reject(data.error);
          }
        })
        .catch(error => {
          reject('Erro na requisição AJAX:', error);
        });
    });
  },
  apiGetCommentById(id) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      }
      LoginService.tokenToHeader(headers)
      fetch(`${URL_API}/comment/${id}`,{
        method: 'GET',
        headers: headers
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            resolve(data.comment);
          } else {
            reject(data.error);
          }
        })
        .catch(error => {
          reject('Erro na requisição AJAX:', error);
        });
    });
  },
  apiPostComment: (comment) => {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      }
      LoginService.tokenToHeader(headers)
      fetch(`${URL_API}/comment`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comment)
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
            resolve('Comentário inserido com sucesso');
          } else {
            reject(data.error);
          }
        })
      .catch(error => {
          reject('Erro na requisição AJAX:', error);
        });
    });
  },
  apiUpdateComment: (comment) => {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      }
      LoginService.tokenToHeader(headers)
      fetch(`${URL_API}/comment/update`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(comment)
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
            resolve('Comentário atualizado com sucesso');
          } else {
            reject(data.error);
          }
        })
      .catch(error => {
          reject('Erro na requisição AJAX:', error);
        });
    });
  }
};

export {CommentService}