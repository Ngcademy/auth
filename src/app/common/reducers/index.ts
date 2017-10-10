
import * as fromAuth from './auth';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface NgAuthState {
    auth: fromAuth.State;
}

export const reducers: any = {
    auth: fromAuth.reducer
};

export const getNgAuthState: any = createFeatureSelector<NgAuthState>('auth');

export const getAuthState: any = createSelector(getNgAuthState, (state: NgAuthState) => state.auth);
export const isLoggedIn: any = createSelector(getAuthState, fromAuth.isLoggedIn);
export const getLoginTimestamp: any = createSelector(getAuthState, fromAuth.getLoginTimestamp);
export const getAuthUser: any = createSelector(getAuthState, fromAuth.getAuthUser);
export const getAuthToken: any = createSelector(getAuthState, fromAuth.getAuthToken);
export const getRefreshToken: any = createSelector(getAuthState, fromAuth.getRefreshToken);
