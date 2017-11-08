import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../classes/Hero';
import {HeroService} from '../../services/hero-service.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'core-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    @Input() hero: Hero;
    private heroService: HeroService;
    private route: ActivatedRoute;
    private location: Location;

    constructor(heroService: HeroService, route: ActivatedRoute, location: Location) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }

}
