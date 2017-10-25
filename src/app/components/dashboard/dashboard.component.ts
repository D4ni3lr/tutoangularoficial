import {Component, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero-service.service';
import {Hero} from '../../classes/Hero';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    heroes: Hero[];

    constructor(private heroService: HeroService) {}

    ngOnInit() {
        this.heroService.getHeroes()
                .then(heroes => this.heroes = heroes.slice(1, 5));
    }

}
