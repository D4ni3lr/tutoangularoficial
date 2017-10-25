import {Component, OnInit} from '@angular/core';
import {Hero} from '../../classes/Hero';
import {HeroService} from '../../services/hero-service.service';
import {Router} from '@angular/router';

@Component({
    selector: 'core-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[] = [];
    selectedHero: Hero;

    private router: Router;

    constructor(private heroService: HeroService, router: Router) {
        this.router = router;
    }

    private loadHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    ngOnInit(): void {
        this.loadHeroes();
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

}
