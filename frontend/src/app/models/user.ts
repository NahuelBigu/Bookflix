import {Profile} from './profile'

export class User {
    _id: string;
    name: string;
    email: String;
    password: String;
    plan: string;
    creditCard: {
            cardNumber:  number;
            expirationMonth: number;
            expirationYear: number; 
            CVV: number;
        };
    profiles: Array<Profile>
}
