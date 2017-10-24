import { Action } from '@ngrx/store';

export namespace Auth {

    const CATEGORY = 'CoreAuth';

    export const LOGOUT = `${CATEGORY} Logout`;
    export const LOGOUT_SUCCESS = `${CATEGORY} Logout Success`;
    export const LOGOUT_FAILED = `${CATEGORY} Logout Failed`;

    export const LOGIN = `${CATEGORY} Login`;
    export const LOGIN_SUCCESS = `${CATEGORY} Login Success`;
    export const LOGIN_FAILED = `${CATEGORY} Login Failed`;

    export const REGISTER = `${CATEGORY} Register`;
    export const REGISTER_SUCCESS = `${CATEGORY} Register Success`;
    export const REGISTER_FAILED = `${CATEGORY} Register Failed`;

    export const CURRENT_USER = `${CATEGORY} Current User`;
    export const CURRENT_USER_SUCCESS = `${CATEGORY} Current User Success`;
    export const CURRENT_USER_FAILED = `${CATEGORY} Current User Failed`;

    export const FORGOT_PASSWORD = `${CATEGORY} Forgot Password`;

    export const RESET_PASSWORD = `${CATEGORY} Reset Password`;
    export const RESET_PASSWORD_SUCCESS = `${CATEGORY} Reset Password Success`;
    export const RESET_PASSWORD_FAILED = `${CATEGORY} Reset Password Failed`;

    /**
     * Action raised when you want the user to be unauthenticated
     */
    export class Logout implements Action {
        readonly type = LOGOUT;
        payload = null;
    }

    /**
     * Success callback of the logout operation
     */
    export class LogoutSuccess implements Action {
        readonly type = LOGOUT_SUCCESS;
        payload = null;
    }

    /**
     * Failure callback of the logout operation
     * @payload The exception caught
     */
    export class LogoutFailed implements Action {
        readonly type = LOGOUT_FAILED;
        constructor(public payload?: any) { }
    }

    /**
     * Action raised when you want to authenticate a user
     * @payload The user object required to authenticate with your integration
     */
    export class Login implements Action {
        readonly type = LOGIN;
        constructor(public payload: any) { }
    }

    /**
     * Success callback of the login operation
     * May optionally respond with the authenticated user object which will be
     * assigned in state
     * @payload The authenticated user object
     */
    export class LoginSuccess implements Action {
        readonly type = LOGIN_SUCCESS;
        constructor(public payload: any) { }
    }

    /**
     * Failure callback of the logion operation
     * Could be an invalid username/password combination, etc.
     */
    export class LoginFailed implements Action {
        readonly type = LOGIN_FAILED;
        constructor(public payload?: any) { }
    }

    /**
     * Action raised when you want to register a user
     */
    export class Register implements Action {
        readonly type = REGISTER;
        constructor(public payload: any) { }
    }

    /**
     * Success callback when a user was successfully registered
     * @payload Optional authenticated user object
     */
    export class RegisterSuccess implements Action {
        readonly type = REGISTER_SUCCESS;
        constructor(public payload?: any) { }
    }

    /**
     * Failure callback of the registration
     * i.e. User already exists, API down, etc.
     */
    export class RegisterFailed implements Action {
        readonly type = REGISTER_FAILED;
        constructor(public payload?: any) { }
    }

    /**
     * Action raised when you want to get the current user from the API
     */
    export class CurrentUser implements Action {
        readonly type = CURRENT_USER;
        payload = null;
    }

    /**
     * Success callback of the current user call
     * @payload The authenticated user object
     */
    export class CurrentUserSuccess implements Action {
        readonly type = CURRENT_USER_SUCCESS;
        constructor(public payload: any) { }
    }

    /**
     * Failure callback of the current user call
     * @payload The caught exception
     */
    export class CurrentUserFailed implements Action {
        readonly type = CURRENT_USER_FAILED;
        constructor(public payload?: any) { }
    }

    /**
     * Action hook for when a user taps a forgot password link
     * Directive hook will automatically dispatch this action on click
     */
    export class ForgotPassword implements Action {
        readonly type = FORGOT_PASSWORD;
        payload = null;
    }

    /**
     * Action raised when a user attempts to reset their password
     */
    export class ResetPassword implements Action {
        readonly type = RESET_PASSWORD;
        constructor(public payload: any) { }
    }

    /**
     * Success callback when a user resets their password
     */
    export class ResetPasswordSuccess implements Action {
        readonly type = RESET_PASSWORD_SUCCESS;
        constructor(public payload?: any) { }
    }

    /**
     * Failure callback when a user resets their password
     */
    export class ResetPasswordFailed implements Action {
        readonly type = RESET_PASSWORD_FAILED;
        constructor(public payload?: any) { }
    }

    export type Actions
        = Logout
        | LogoutSuccess
        | LogoutFailed
        | Login
        | LoginSuccess
        | LoginFailed
        | Register
        | RegisterSuccess
        | RegisterFailed
        | CurrentUser
        | CurrentUserSuccess
        | CurrentUserFailed
        | ForgotPassword
        | ResetPassword
        | ResetPasswordSuccess
        | ResetPasswordFailed;
}

