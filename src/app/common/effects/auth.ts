import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';

import { Auth } from '../actions/auth';
import { BaseAuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(Auth.LOGIN)
        .map((action: Auth.Login) => action.payload)
        .exhaustMap(payload =>
            this.authService.login(payload)
                .map(user => new Auth.LoginSuccess(user))
                .catch(error => of(new Auth.LoginFailed(error)))
        );

    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(Auth.REGISTER)
        .map((action: Auth.Register) => action.payload)
        .exhaustMap(payload =>
            this.authService.register(payload)
                .map(authUser => new Auth.RegisterSuccess(authUser))
                .catch(error => of(new Auth.RegisterFailed(error)))
        );

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(Auth.LOGOUT)
        .exhaustMap(() =>
            this.authService.logout()
                .map(() => new Auth.LogoutSuccess)
                .catch(error => of(new Auth.LogoutFailed(error)))
        );

    constructor(
        private authService: BaseAuthService,
        private actions$: Actions) { }
}
