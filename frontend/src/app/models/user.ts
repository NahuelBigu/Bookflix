import {Profile} from './profile'

export class User {
    _id: string;
    email: String;
    password: String;
    plan: number;
    creditCard: {
            creditCardNumber:  number;
            creditCardName: String;
            creditCardMM: number;
            creditCardYY: number; 
            creditCardCVV: number;
        };
    profiles: Array<Profile>
}
