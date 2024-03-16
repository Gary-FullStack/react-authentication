

    export const api = (
        path, 
        method = 'GET',
        body = null, 
        credentials = null
        ) => {

       const url = "http://localhost:5001/api" + path;

         const options = {
              method,
              headers: {}
            };

            if (body) {
              options.headers['Content-Type'] = 'application/json; charset=utf-8';
              options.body = JSON.stringify(body);
            }

            if (credentials) {
              const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
              options.headers.Authorization = `Basic ${encodedCredentials}`;
            }

            return fetch(url, options);
         
    };

    
