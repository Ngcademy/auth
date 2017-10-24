import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { BaseAuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import * as tokens from './tokens';
import { ForgotPasswordLinkDirective } from './directives/forgot-password-link.directive';

const providers = [
    {
        provide: tokens.ForgotPasswordEventToken,
        useValue: 'click'
    },
    BaseAuthService
];

@NgModule({
    imports: [
        StoreModule.forFeature('coreAuth', reducers),
        EffectsModule.forFeature([AuthEffects])
    ],
    providers: [
        ...providers
    ],
    declarations: [ForgotPasswordLinkDirective],
    exports: [
        ForgotPasswordLinkDirective
    ]
})
export class NgAuthCommonModule {

    static forRoot(configuredProviders: any[] = []): ModuleWithProviders {
        return {
            ngModule: NgAuthCommonModule,
            providers: [
                ...providers,
                ...configuredProviders
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: NgAuthCommonModule) {
        if (parentModule) {
            throw new Error('NgAuthCommonModule already loaded. Import into the root module only.');
        }
    }

}
