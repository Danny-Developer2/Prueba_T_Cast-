import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development'
export interface Vehicule {
  id: string;
  model: string;
  images: { id: string; url: string; vehicleId: string }[];
  placas: string;
  doors: number;
  modelos: { id: string; modelo: string; vehicleId: string }[];
}

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vehicle-detail.component.html',
})
export class VehicleDetailComponent implements OnInit {
  vehicule: Vehicule | null = null;
  private apiUrl = environment.apiUrl;
  currentIndex: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.getVehicleDetails(vehicleId);
    }
  }

  getVehicleDetails(vehicleId: string): void {
    this.http.get<Vehicule>(`${this.apiUrl}/${vehicleId}`).subscribe(
      (data) => {
        this.vehicule = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
      }
    );
  }

  next() {
    if (this.vehicule && this.vehicule.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.vehicule.images.length;
      console.log('Índice actual:', this.currentIndex);
    }
  }

  prev() {
    if (this.vehicule && this.vehicule.images.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.vehicule.images.length) %
        this.vehicule.images.length;
      console.log('Índice actual:', this.currentIndex);
    }
  }

  updateVehicule() {
    console.log('Actualizando datos del vehículo...');
  }

  updateImages() {
    console.log('Actualizando imágenes nuevas...');
  }

  deleteVehicule(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
