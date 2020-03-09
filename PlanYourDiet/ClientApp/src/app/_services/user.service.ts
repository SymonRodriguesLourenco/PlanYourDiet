import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {CurrentUser} from '../_models/currentUser';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  getUserInfo(){
    return this.http.get<CurrentUser>(`/currentUser`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
