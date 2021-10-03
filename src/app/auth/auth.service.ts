/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthentificated = false;
  constructor() { }

  get userIsAuthentificated(){
      // eslint-disable-next-line no-underscore-dangle
      return this._userIsAuthentificated;
  }

  onLogin(){
    this._userIsAuthentificated = true;
  }

  onLogOut(){
    this._userIsAuthentificated = false;
  }

}
