import {Injectable} from '@angular/core';
import {Hero} from '../classes/Hero';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class HeroService {

    private http: HttpClient;
    private messageService: MessageService;
    private heroesUrl = '/api/heroes';  // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(http: HttpClient, messageService: MessageService) {
        this.http = http;
        this.messageService = messageService;
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: fetched heroes');

        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            tap(heroes => this.log(`fetched heroes`)),
            catchError(this.handleError('getHeroes', []))
        );

        /*
        antiguo modulo http
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .catch(this.handleError);
            */
        /*
        return Promise.resolve(HEROES);
        /* Esto se llama funciones flecha */
        /*
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
        */
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    updateHero(hero: Hero): Observable<Hero> {

        return this.http.put(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated hero id=${hero.id}`)),
                catchError(this.handleError<any>('updateHero'))
            );

        /*
        angular 4
        // Con typescript se compila este string
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
            */
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
        /*
        angular 4
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Hero)
            .catch(this.handleError);*/
    }

    /** DELETE: delete the hero from the server */
    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        );
    }

    /*
        delete(id: number): Promise<void> {
            const url = `${this.heroesUrl}/${id}`;
            return this.http.delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
        }
    */
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }

    /*
    angular 4
    search(term: string): Observable<Hero[]> {
        return this.http.get(`${this.heroesUrl}?name=${term}`).map(response => response.json() as Hero[]);
    }
    */
}
