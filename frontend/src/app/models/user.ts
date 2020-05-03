import {Profile} from './profile'

export class User {
    _id: string;
    email: String;
    password: String;
    plan: string;
    creditCard: {
            creditCardName: string;
            creditCardNumber:  number;
            creditCardMM: number;
            creditCardYY: number; 
            creditCardCVV: number;
        };
    profiles: Array<Profile>
}
