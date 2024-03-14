const URL_API = "http://localhost:7000";

const CommentService = {
  apiGetComment: () => {
    return new Promise((resolve, reject) => {
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
};

export {CommentService}