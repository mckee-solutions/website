import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageAboutComponent} from './components/pages/about/page-about.component';

const routes: Routes = [
  {path: '', component: PageAboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
