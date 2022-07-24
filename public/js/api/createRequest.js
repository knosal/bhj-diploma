const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';
    let queryParams = '';
    
    if (options.data !== undefined) {
        if (options.method === 'GET') {
            queryParams = '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&'); //преобразование объекта с ключами и значениями в массив массивов
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
        }
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let err = null;
            let response = null;
            if (xhr.status === 200) {
                //если поля в объекте нет, то вернет undefined, чтобы не было ошибки
                if (xhr.response?.success) { 
                    response = xhr.response; 
                } else { 
                    err = xhr.response; 
                } 
            } else {
                err = new Error('...');
            }
    /**
     * Постоянно ругается на данный блок: Uncaught TypeError: options.callback is not a function
    at xhr.onreadystatechange (createRequest.js:33:25)
    */
            if (options.callback) {
                options.callback(err, response);
                console.log(response);
            }
        }
    };

	xhr.open(options.method, options.url + queryParams);
    xhr.send(formData);

    return xhr;
};