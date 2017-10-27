import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Auth } from '../actions/auth';

@Injectable()
export class BaseAuthService {

    constructor(private store$: Store<any>) { }

    dispatchLogin(payload: any): void {
        this.store$.dispatch(new Auth.Login(payload));
    }

    login(user: any): Observable<any> {
        return of({
            firstName: 'John',
            lastName: 'Doe'
        });
    }

    register(user: any): Observable<any> {
        return of();
    }

    logout(): Observable<any> {
        return of(true);
    }

}
