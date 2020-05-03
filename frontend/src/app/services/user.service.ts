import { Injectable } from '@angular/core';
import { User } from '../others/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  user: User
}
