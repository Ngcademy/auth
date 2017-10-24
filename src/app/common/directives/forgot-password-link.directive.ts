import { Directive, ElementRef, AfterViewInit, Inject } from '@angular/core';
import * as tokens from '../tokens';
import { Store } from '@ngrx/store';
import { Auth } from '../actions/auth';

@Directive({
    selector: '[forgotPasswordLink]'
})
export class ForgotPasswordLinkDirective implements AfterViewInit {

    constructor(
        @Inject(tokens.ForgotPasswordEventToken) private eventToken: string,
        private store$: Store<any>,
        private element: ElementRef) { }

    ngAfterViewInit() {
        if (this.eventToken) {
            this.element.nativeElement.addEventListener(this.eventToken, () => {
                this.dispatchForgotPassword();
            });
        }
    }

    dispatchForgotPassword(): void {
        this.store$.dispatch(new Auth.ForgotPassword);
    }

}
