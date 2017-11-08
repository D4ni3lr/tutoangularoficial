import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {HeroService} from '../../services/hero-service.service';
import {Hero} from '../../classes/Hero';


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroService]
})
export class HeroSearchComponent implements OnInit {

    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroSearchService: HeroService, private router: Router) {
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }


    ngOnInit() {
        this.heroes = this.searchTerms.
            pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.heroSearchService.searchHeroes(term)),
        );



/*
angular 4
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.heroSearchService.search(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Hero[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
            */
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

}
