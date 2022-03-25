import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MaterialModule } from 'src/app/material.module';
import { CrearPostComponent } from './crearPost/crearPost.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeAdminComponent,
    CrearPostComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
