import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken():string | null {
    return localStorage.getItem('token')
    }

  setAuthToken(token: string, user: User ) {
    localStorage.setItem('User', "user");
    return localStorage.setItem('token', token);
    }
}
