const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';
    let queryParams = '';
    
    if (options.data) {
        if (options.method === 'GET') {
            queryParams = '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&'); //преобразование объекта с ключами и значениями в массив массивов
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
        }
    }

    xhr.onload = () => {
        let err = null;
        let response = xhr.response; 
        options.callback(err, response);
        console.log(response);
        
    };

    xhr.onerror = () => {
        alert(`Ошибка соединения ${xhr.status}: ${xhr.statusText}`);
    };

	xhr.open(options.method, options.url + queryParams);
    xhr.send(formData);

    return xhr;
};