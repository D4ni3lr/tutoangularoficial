import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroService} from './services/hero-service.service';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

//voi por aca
//https://angular.io/tutorial/toh-pt5#add-heroes-to-the-dashboard
