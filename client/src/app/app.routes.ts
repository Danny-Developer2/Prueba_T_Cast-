import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles-catalog.component';
import { VehicleCreateComponent } from './vehicles/vehicle-create.component';
import { VehicleHomeComponent } from 'src/app/vehicles/vehicle-home.component';




export const routes: Routes = [


  { path: '', component: VehicleHomeComponent },
  { path:'vehicles', component: VehiclesComponent},
  { path: 'create', component: VehicleCreateComponent },
  // { path: 'vehicle-detail/:id', component: VehicleDetailComponent },
  // { path: 'vehicle/:id/edit', component: UpdateVehiculeComponent },
  // { path: '', component: VehicleHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


