import { NgModule } from '@angular/core';
import { BaseAuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects])
    ],
    providers: [
        BaseAuthService
    ]
})
export class NgAuthCommonModule { }
