import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { LogoComponent } from './components/logo/logo.component';
import { HttpClientModule } from '@angular/common/http';
<%= gnr8d_component_imports %>

@NgModule({
  declarations: [
    <%= gnr8d_component_declarations %>
    RootComponent,
    LogoComponent,
    LeftSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
