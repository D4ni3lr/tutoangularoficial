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
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
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

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero(new Hero(null, name))
            .subscribe(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }

    /*
    delete(hero: Hero): void {
        this.heroService
            .deleteHero(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            });
    }
    */

}
