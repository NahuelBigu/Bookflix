import {Profile} from './profile'

export class User {
    _id: string;
    name: string;
    email: String;
    password: String;
    plan: string;
    creditCard: {
            cardNumber:  number;
            expiration: Date; 
            CVV: number;
        };
    profiles: Array<Profile>
}
