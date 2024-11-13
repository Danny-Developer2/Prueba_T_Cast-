import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ModelsComponent } from './models/models.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { DeleteVehiculeComponent } from './delete-vehicule/delete-vehicule.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { UpdateImagesVeiculeComponent } from './update-images-veicule/update-images-veicule.component';
import { UpdateImagesComponent } from './update-images/update-images.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: 'vehicules', component: VehiculesComponent },
  { path: 'create', component: CreateComponent},
  { path: 'models', component: ModelsComponent},
  { path: 'vehicle-detail/:id', component: VehicleDetailComponent } ,
  { path: 'vehicle-delete/:id', component: DeleteVehiculeComponent},
  { path: 'vehicle-delete/', component: DeleteVehiculeComponent},
  { path: 'update-vehicule/:id', component: UpdateVehiculeComponent },
  { path: 'update-vehicule-images/:id', component: UpdateImagesVeiculeComponent },
  { path: 'update-images/:id', component: UpdateImagesComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

