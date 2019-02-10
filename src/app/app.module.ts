import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {RootComponent} from './components/root/root.component';
import {LeftSidebarComponent} from './components/left-sidebar/left-sidebar.component';
import {LogoComponent} from './components/logo/logo.component';
import {PageAboutComponent} from './components/pages/about/page-about.component';

@NgModule({
    declarations: [
        RootComponent,
        LogoComponent,
        LeftSidebarComponent,
        PageAboutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [RootComponent]
})
export class AppModule {
}
