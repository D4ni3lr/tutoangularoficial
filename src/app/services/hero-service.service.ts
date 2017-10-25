import {Injectable} from '@angular/core';
import {Hero} from '../classes/Hero';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

    private http: Http;
    private heroesUrl = '/api/heroes';  // URL to web api

    constructor(http: Http) {
        this.http = http;
    }


    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function(response){
                console.log(response);
                return response.json();
            })
            .catch(this.handleError);
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

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
