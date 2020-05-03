import {Profile} from './profile'

export class User {
    _id: string;
    name: string;
    email: String;
    password: String;
    plan: string;
    creditCard: {
            creditCardNumber:  number;
            creditCardName: string;
            creditCardMM: number;
            creditCardYY: number; 
            creditCardCVV: number;
        };
    profiles: Array<Profile>
}
