import {Component, OnInit} from '@angular/core';
import {Hero} from "../../classes/Hero";
import {HeroService} from "../../services/hero-service.service";

@Component({
    selector: 'core-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[] = [];
    selectedHero: Hero;

    constructor(private heroService: HeroService) {
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

}
