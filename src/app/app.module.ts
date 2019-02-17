import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
// import {AppRoutingModule} from './app-routing.module';
import {RootComponent} from './components/root/root.component';
import {LeftSidebarComponent} from './components/left-sidebar/left-sidebar.component';
import {LogoComponent} from './components/logo/logo.component';
import {PageComponent} from './components/page/page.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    RootComponent,
    LogoComponent,
    LeftSidebarComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {
  constructor() {
    library.add(faBars);
  }
}
