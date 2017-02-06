function QueryString() {
    const qs = {};
    const vars = window.location.search.substring(1).split('&');
    for (let i = 0; i < vars.length; i += 1) {
        const pair = vars[i].split('=');
            // If first entry with this name
        if (typeof qs[pair[0]] === 'undefined') {
            qs[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof qs[pair[0]] === 'string') {
            const arr = [qs[pair[0]], decodeURIComponent(pair[1])];
            qs[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            qs[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return qs;
}

function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
        // console.log('get token from localStorage');
        return token;
    }

    const qs = QueryString();
    if (qs && qs.token) {
        localStorage.setItem('token', qs.token);
        // console.log('get token from login redirect url');
       // window.history.pushState({ token: qs.token }, 'Timelapse', '/');
        return qs.token;
    }

    return null;
}

function resetToken() {
    localStorage.setItem('token', '');
}

export { getToken, resetToken };
