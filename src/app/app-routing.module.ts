import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';

const routes: Routes = [
  { path: '', redirectTo: 'admins', pathMatch: 'full' },
  { path: 'admins', component: AdminsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
