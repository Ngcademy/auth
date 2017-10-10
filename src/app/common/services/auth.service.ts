import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BaseAuthService {

    login(user: any): Observable<any> {
        return of({
            firstName: 'John',
            lastName: 'Doe'
        });
    }

    register(user: any): Observable<any> {
        return of();
    }

    logout(): Observable<any> {
        return of(true);
    }

}
