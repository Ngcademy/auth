import { reducer } from './auth';
import { Auth } from '../actions/auth';

const testState = {
    loggedIn: false,
    authUser: undefined
};

describe('Auth reducer', () => {

    it('should return the current state when no valid actions have been dispatched', () => {
        const state = testState;
        const actual = reducer(state, {
            type: 'INVALID_ACTION'
        });
        const expected = state;
        expect(actual).toBe(expected);
    });

    describe('LOGOUT is dispatched', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = Object.assign({}, testState, {
                authUser: {},
                authToken: 'uuid',
                refreshToken: 'uuid',
                loggedIn: true,
                loginTimestamp: Date.now()
            });
            actual = reducer(state, {
                type: Auth.LOGOUT
            });
        });

        it('should set loggedIn to false', () => {
            expect(actual.loggedIn).toBeFalsy();
        });

        it('should set authUser to undefined', () => {
            expect(actual.authUser).toBeUndefined();
        });

        it('should set authToken to undefined', () => {
            expect(actual.authToken).toBeUndefined();
        });

        it('should set refreshToken to undefined', () => {
            expect(actual.refreshToken).toBeUndefined();
        });

        it('shuold set loginTimestamp to undefined', () => {
            expect(actual.loginTimestamp).toBeUndefined();
        });

    });

    it('should set loginErrors to undefined when LOGIN is dispatched', () => {
        const state = Object.assign({}, testState, {
            loginErrors: ['Test']
        });
        const actual = reducer(state, {
            type: Auth.LOGIN
        });
        expect(actual.loginErrors).toBeUndefined();
    });

    describe('LOGIN_SUCCESS is dispatched', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = testState;
            actual = reducer(state, {
                type: Auth.LOGIN_SUCCESS,
                payload: {
                    firstName: 'Sean',
                    lastName: 'Perkins'
                }
            });
        });

        it('should set the authUser', () => {
            expect(actual.authUser).toBeDefined();
            expect(actual.authUser.firstName).toEqual('Sean');
            expect(actual.authUser.lastName).toEqual('Perkins');
        });

        it('should set loggedIn to true', () => {
            expect(actual.loggedIn).toBeTruthy();
        });

        it('should set loginErrors to undefined', () => {
            expect(actual.loginErrors).toBeUndefined();
        });

        it('should set loginTimestamp to now', () => {
            expect(actual.loginTimestamp).toBeTruthy();
            expect(actual.loginTimestamp).toBeLessThanOrEqual(Date.now());
        });

    });

    it('should set the loginErrors when LOGIN_FAILED is dispatched', () => {
        const state = testState;
        const actual = reducer(state, {
            type: Auth.LOGIN_FAILED,
            payload: 'Failed to Login'
        });
        const expected = 'Failed to Login';
        expect(actual.loginErrors).toEqual(expected);
    });

    it('should set registrationErrors to undefined when REGISTER is dispatched', () => {
        const state = Object.assign({}, testState, {
            registrationErrors: ['Test']
        });
        const actual = reducer(state, {
            type: Auth.REGISTER
        });
        expect(actual.registrationErrors).toBeUndefined();
    });

    describe('REGISTER_SUCCESS is dispatched', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = testState;
            actual = reducer(state, {
                type: Auth.REGISTER_SUCCESS,
                payload: {
                    firstName: 'Sean'
                }
            });
        });

        it('should set registrationErrors to undefined', () => {
            expect(actual.registrationErrors).toBeUndefined();
        });

        it('should set authUser if one exists', () => {
            expect(actual.authUser).toBeDefined();
            expect(actual.authUser.firstName).toEqual('Sean');
        });

        it('authUser should be undefined if none exists', () => {
            actual = reducer(state, {
                type: Auth.REGISTER_SUCCESS,
            });
            expect(actual.authUser).toBeUndefined();
        });

    });

    it('should set registrationErrors when REGISTER_FAILED is dispatched', () => {
        const state = testState;
        const actual = reducer(state, {
            type: Auth.REGISTER_FAILED,
            payload: 'Failed to Register'
        });
        const expected = 'Failed to Register';
        expect(actual.registrationErrors).toBeDefined();
        expect(actual.registrationErrors).toEqual(expected);
    });

});
