import history from '../history';
import jwt from 'jsonwebtoken';

export default class Auth {
  
  constructor() {
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken) {
      return new Error('Hubo un error al generar el token');
    }
    return accessToken;
  }

  getUser(){
    if (this.isAuthenticated()) {
      let token = this.getAccessToken();
      let payload = jwt.verify(token, 'secret');
      return payload.user;
    } else {
      return new Error('Hubo un error al generar el Id');
    }
  }

  setSession(token, usuario) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((10 * 60 * 1000) + new Date().getTime());
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    //history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (new Date().getTime() < expiresAt) {
      let newExpiresAt = JSON.stringify((10 * 60 * 1000) + new Date().getTime());
      localStorage.setItem('expires_at', newExpiresAt);
      return true;
    } else {
      this.logout();
      return false;
    }
  }
}
