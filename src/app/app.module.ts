import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroService} from './services/hero-service.service';
import {HeroSearchComponent} from './components/hero-search/hero-search.component';
import {HttpClientModule} from '@angular/common/http';
import { MessagesComponent } from './components/messages/messages.component';
import {MessageService} from './services/message.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        HeroSearchComponent,
        MessagesComponent
    ],
    providers: [HeroService, MessageService ],
    bootstrap: [AppComponent]
})
export class AppModule {

}