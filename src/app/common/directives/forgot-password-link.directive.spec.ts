import { ForgotPasswordLinkDirective } from './forgot-password-link.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as tokens from '../tokens';

@Component({
    selector: 'test-cmp',
    template: '<button type="button" forgotPasswordLink>Testing</button>'
})
class TestComponent {
    @ViewChild(ForgotPasswordLinkDirective) forgotPasswordLinkDirective: ForgotPasswordLinkDirective;
}

describe('ForgotPasswordLinkDirective', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                ForgotPasswordLinkDirective
            ],
            imports: [
                StoreModule.forRoot({})
            ],
            providers: [
                {
                    provide: tokens.ForgotPasswordEventToken,
                    useValue: 'click'
                }
            ]
        });
    });

    describe('with default element', () => {
        let fixture: ComponentFixture<TestComponent>;
        let forgotPasswordInstance: ForgotPasswordLinkDirective;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            forgotPasswordInstance = fixture.componentInstance.forgotPasswordLinkDirective;
        });

        it('should call dispatchForgotPassword() on click', () => {
            spyOn(forgotPasswordInstance, 'dispatchForgotPassword');
            const btn = fixture.nativeElement.querySelector('button');
            btn.click();
            fixture.whenStable().then(() => {
                expect(forgotPasswordInstance.dispatchForgotPassword).toHaveBeenCalled();
            });
        });

        afterAll(() => {
            fixture = undefined;
            forgotPasswordInstance = undefined;
        });

    });

});

