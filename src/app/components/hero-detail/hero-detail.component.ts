import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../classes/Hero';

@Component({
    selector: 'core-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    @Input() hero: Hero;
/*
    constructor(hero: Hero) {
        this.hero = hero;
    }
*/
    ngOnInit() {
    }

}
