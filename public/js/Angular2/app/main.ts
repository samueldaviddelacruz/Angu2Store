// import { bootstrap } from '@angular/platform-browser-dynamic';
//
// // Our main component
// import { AppComponent } from './app.component';
//
// // Our main routes
// import { APP_ROUTER_PROVIDERS } from './app.routes';
//
// bootstrap(AppComponent, [
//     APP_ROUTER_PROVIDERS
// ])
//     .catch(err => console.error(err));


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule}              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);