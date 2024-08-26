import { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const request = new Request('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }), // username corresponds to the email
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
  },
  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;