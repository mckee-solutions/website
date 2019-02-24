import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<%= gnr8d_component_imports %>

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  <%= gnr8d_additional_routes %>
  { path: '**', redirectTo: '/about' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
