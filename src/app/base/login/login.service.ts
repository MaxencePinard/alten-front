import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor() {

    }

    public getShowLoginDialog(): boolean {
        return true;
    }
}
