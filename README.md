# Ngx Auth

[![npm](https://img.shields.io/npm/v/@teammaestro/ngx-auth.svg)](https://www.npmjs.com/package/@teammaestro/ngx-auth)
[![npm](https://img.shields.io/npm/dt/@teammaestro/ngx-auth.svg?label=npm%20downloads)](https://www.npmjs.com/package/@teammaestro/ngx-auth)

[![NPM](https://nodei.co/npm/@teammaestro/ngx-auth.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@teammaestro/ngx-auth/)

An extendable common authentication module for any Angular application. Leverage pre-built, tested code that can be easily extended to provide your own authentication layer on-top of a stack that satisfies most business use-cases.

## Getting Started

Import the `NgxAuthModule` in your root `AppModule`. You can optionally extend the `BaseAuthService` to handle your own authentication endpoints (recommended).

```
imports: [
    NgxAuthModule.forRoot([
        {
            provide: BaseAuthService,
            useClass: MyCustomAuthService
        }
    ])
]
```

## Actions

`import { Auth } from '@teammaestro/ngx-auth';`

#### Login

The `Login` action accepts a payload matching the required request body for your authentication login endpoint. In this example we pass an example username and password into the action.
```
this.store$.dispatch(new Auth.Login({
    username: 'foo',
    password: 'bar'
}));
```

This information is forwarded to your login API endpoint.

#### Login Success

The `LoginSuccess` action is emitted when the `AuthService.login()` method successfully returns back a `200` status code. By default we expect the response body to contain the authenticated user object.

The `authUser` property will be assigned to state based on the response body.

To extend this interaction, create an effect:

i.e.:
```typescript
import { Effect, Actions } from '@ngrx/effects';
import { Auth } from '@teammaestro/ngx-auth';

@Effect()
class ExampleEffect {

    onLoginSuccess$ = this.actions$
        .ofType(Auth.LOGIN_SUCCESS)
        .map(() => {
            // extendable code
        });

    constructor(private actions$: Actions) {}
}
```

#### Login Failed

The `LoginFailed` action is emitted when the `AuthService.login()` method returns back an invalid response code (i.e. `400 Bad Request`). The middleware will assign any response body to the `loginErrors` property of state. To access this data, subscribe to `getLoginErrors`.

To extend this interaction, create an effect:

i.e.:
```typescript
import { Effect, Actions } from '@ngrx/effects';
import { Auth } from '@teammaestro/ngx-auth';

@Effect()
class ExampleEffect {

    onLoginFailed$ = this.actions$
        .ofType(Auth.LOGIN_FAILED)
        .map(() => {
            // extendable code
        });

    constructor(private actions$: Actions) {}
}
```

#### Logout

The `Logout` action will clear all data currently stored on the `coreAuth` state container. This gives your application piece of mind that all user data is destroyed.

```typescript
this.store$.dispatch(new Auth.Logout);
```

#### Register

The `Register` action will pass the payload to a pre-defined endpoint to handle the registration workflow. By default the payload is expect the request body for the registration endpoint.

```typescript
this.store$.dispatch(new Auth.Register({
    firstName: 'John',
    lastName: 'Smith',
    password: 'foobar',
    email: 'john.smith@example.com'
}));
```

#### Register Success

The `RegisterSuccess` action is emitted when the `AuthService.register()` function successfully returns back a valid status code (i.e. 200). Optionally the response body from the API can be assigned as the `authUser`.

To extend this interaction, create an effect:

i.e.:
```typescript
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Auth } from '@teammaestro/ngx-auth';

@Effect()
class ExampleEffect {

    onRegisterSuccess$ = this.actions$
        .ofType(Auth.REGISTER_SUCCESS)
        .map(toPayload)
        .map(payload => {
            // extendable code
        });

    constructor(private actions$: Actions) {}
}
```

You may also reassign data in your own auth reducer, based on the action dispatching.

```typescript
reducer(state = initialState, action: Auth.Actions): State {
    case Auth.REGISTER_SUCCESS:
        return Object.assign({}, state, {
            // extendable code
        });
    default: {
        return state;
    }
}
```

#### Register Failed

The `RegisterFailed` action is emitted when the `AuthService.register()` function responds with an invalid status code (i.e. `400 Bad Request`). Any errors from the response body will be assigned to `registrationErrors`. You can access this data by subscribing to `getRegistrationErrors`.

To extend this interaction, create an effect:

i.e.:

```typescript
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Auth } from '@teammaestro/ngx-auth';

@Effect()
class ExampleEffect {

    onRegisterFailed$ = this.actions$
        .ofType(Auth.REGISTER_FAILED)
        .map(toPayload)
        .map(payload => {
            // extendable code
        });

    constructor(private actions$: Actions) {}
}
```

#### Current User

_To do documentation_

#### Current User Success

_To do documentation_

#### Current User Failed (alias: Unauthenticated)

_To do documentation_


#### Forgot Password

_To do documentation_

#### Reset Password

_To do documentation_

#### Reset Password Success

_To do documentation_

#### Reset Password Failed

_To do documentation_

### Roadmap

- Plumbing to update authenticated user object
- Extendable model for accessing/leveraging access & refresh tokens for OAuth2 authentication environments.
- Example sample application

## Contributors

[<img alt="Sean perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=3&s=117" width="117">](https://github.com/sean-perkins) |
:---:
|[Sean Perkins](https://github.com/sean-perkins)|
