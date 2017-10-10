import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import * as auth from '../actions/auth';
import { BaseAuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(auth.LOGIN)
        .map(toPayload)
        .switchMap(payload =>
            this.authService.login(payload)
                .map(authUser => new auth.LoginSuccess(authUser))
                .catch(error => of(new auth.LoginFailed(error)))
        );

    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(auth.REGISTER)
        .map(toPayload)
        .switchMap(payload =>
            this.authService.register(payload)
                .map(authUser => new auth.RegisterSuccess(authUser))
                .catch(error => of(new auth.RegisterFailed(error)))
        );

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(auth.LOGOUT)
        .switchMap(() =>
            this.authService.logout()
                .map(() => new auth.LogoutSuccess)
                .catch(error => of(new auth.LogoutFailed(error)))
        );

    constructor(
        private authService: BaseAuthService,
        private actions$: Actions) { }
}
