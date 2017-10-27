import { Component, OnInit } from '@angular/core';

import { Auth, BaseAuthService } from './common';
import { Actions } from '@ngrx/effects';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    title = 'app';

    constructor(
        private actions$: Actions,
        private authService: BaseAuthService) { }

    ngOnInit() {
        this.actions$
            .ofType(Auth.LOGIN_SUCCESS)
            .map(() => {
                console.log('LOGIN SUCCESS');
            })
            .subscribe();

        this.authService.dispatchLogin({
            firstName: 'Sean',
            lastName: 'Perkins'
        });


    }
}
