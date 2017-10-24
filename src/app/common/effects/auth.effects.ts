import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Auth } from '../actions/auth';
import { BaseAuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(Auth.LOGIN)
        .map(toPayload)
        .switchMap(payload =>
            this.authService.login(payload)
                .map(authUser => new Auth.LoginSuccess(authUser))
                .catch(error => of(new Auth.LoginFailed(error)))
        );

    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(Auth.REGISTER)
        .map(toPayload)
        .switchMap(payload =>
            this.authService.register(payload)
                .map(authUser => new Auth.RegisterSuccess(authUser))
                .catch(error => of(new Auth.RegisterFailed(error)))
        );

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(Auth.LOGOUT)
        .switchMap(() =>
            this.authService.logout()
                .map(() => new Auth.LogoutSuccess)
                .catch(error => of(new Auth.LogoutFailed(error)))
        );

    constructor(
        private authService: BaseAuthService,
        private actions$: Actions) { }
}
