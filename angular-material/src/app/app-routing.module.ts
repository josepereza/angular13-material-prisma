import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'auth', loadChildren:()=>import('./pages/auth/auth.module').then(m=>m.AuthModule)},
  {path:'admin', loadChildren:()=>import('./pages/admin/admin.module').then(m=>m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
