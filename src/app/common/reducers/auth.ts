import * as auth from '../actions/auth';

export interface State {

    loggedIn: boolean;

    loginTimestamp?: number;

    authUser: any;

    authToken?: string;

    refreshToken?: string;

}

const initialState: State = {
    loggedIn: false,
    authUser: undefined
};

export function reducer(state = initialState, action: auth.Actions): State {
    switch (action.type) {
        case auth.LOGOUT:
            return Object.assign({}, state, {
                authUser: undefined,
                authToken: undefined,
                refreshToken: undefined,
                loggedIn: false,
                loginTimestamp: undefined
            });
        case auth.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                authUser: action.payload,
                loggedIn: true,
                loginTimestamp: Date.now()
            });
        default: {
            return state;
        }
    }
}

export const isLoggedIn = (state: State) => state.loggedIn;
export const getLoginTimestamp = (state: State) => state.loginTimestamp;
export const getAuthUser = (state: State) => state.authUser;
export const getAuthToken = (state: State) => state.authToken;
export const getRefreshToken = (state: State) => state.refreshToken;
