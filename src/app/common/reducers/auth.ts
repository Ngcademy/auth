import { Auth } from '../actions/auth';

export interface State {

    loggedIn: boolean;

    loginTimestamp?: number;

    authUser: any;

    authToken?: string;

    refreshToken?: string;

    loginErrors?: any;

    registrationErrors?: any;

}

const initialState: State = {
    loggedIn: false,
    authUser: undefined
};

export function reducer(state = initialState, action: Auth.Actions): State {
    switch (action.type) {
        case Auth.LOGOUT:
            return Object.assign({}, state, {
                authUser: undefined,
                authToken: undefined,
                refreshToken: undefined,
                loggedIn: false,
                loginTimestamp: undefined
            });
        case Auth.LOGIN:
            return Object.assign({}, state, {
                loginErrors: undefined
            });
        case Auth.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                authUser: action.payload,
                loggedIn: true,
                loginErrors: undefined,
                loginTimestamp: Date.now()
            });
        case Auth.LOGIN_FAILED:
            return Object.assign({}, state, {
                loginErrors: action.payload
            });
        case Auth.REGISTER:
            return Object.assign({}, state, {
                registrationErrors: undefined
            });
        case Auth.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                authUser: action.payload,
                registrationErrors: undefined
            });
        case Auth.REGISTER_FAILED:
            return Object.assign({}, state, {
                registrationErrors: action.payload
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
export const getLoginErrors = (state: State) => state.loginErrors;
export const getRegistrationErrors = (state: State) => state.registrationErrors;
