import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPostComponent } from './crearPost/crearPost.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
{path:'',component:HomeAdminComponent},
{path:'altas', component:CrearPostComponent},
{path:'home', component:HomeAdminComponent},
{path:'**',component:HomeAdminComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
