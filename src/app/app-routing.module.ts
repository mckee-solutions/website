import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageAboutComponent} from './components/pages/about/page-about.component';

const routes: Routes = [
  {path: 'about', component: PageAboutComponent},
  {path: 'crux', component: PageAboutComponent},
  {path: '', redirectTo: '/about', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
