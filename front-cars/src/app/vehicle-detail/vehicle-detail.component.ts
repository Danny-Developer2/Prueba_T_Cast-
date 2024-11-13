import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.development';
export interface Vehicule {
  id: string;
  model: string;
  images: { id: string; url: string; vehicleId: string }[];
  placas: string;
  doors: number;
}



@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css'
})
export class VehicleDetailComponent  {
  
  vehicule: Vehicule | null = null;  // Almacena los datos del vehículo
  private apiUrl = environment.apiUrl // URL base de la API
  // Método para actualizar los datos del vehículo
  updateVehicule() {
    console.log('Actualizando datos del vehículo...');
    // Lógica para actualizar los datos del vehículo
  }

  // Método para actualizar imágenes nuevas
  updateImages() {
    console.log('Actualizando imágenes nuevas...');
    // Lógica para cargar nuevas imágenes
  }

  // Método para eliminar el coche
  deleteVehicule(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Construye la URL con el ID del vehículo
    return this.http.delete(url); // Realiza la solicitud DELETE
  }
  

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private http: HttpClient  // Para realizar la solicitud HTTP
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      // Hacer una solicitud GET para obtener los detalles del vehículo
      this.getVehicleDetails(vehicleId);
    }
  }

  // Método para hacer la solicitud GET a la API
  getVehicleDetails(vehicleId: string): void {
    this.http.get<Vehicule>(`${this.apiUrl}/${vehicleId}`).subscribe(
      (data) => {
        this.vehicule = data;  // Asignar los datos del vehículo a la variable 'vehicle'
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
      }
    );

    
  }

}
