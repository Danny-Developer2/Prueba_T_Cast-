import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { environment } from '../../environments/environments.development';

interface Image {
  id: string;
  url: string;
  vehicleId: string;
}

interface Modelo {
  modelo: string;
  vehicleId: string;
}

interface Vehicle {
  id: string;
  model: string;
  placas: string;
  doors: string;
  modelos: Modelo[];  
  images: Image[];
}

@Component({
  selector: 'app-vehicules',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  
  templateUrl: './vehicules.component.html',
  // styleUrls: ['./vehicules.component.css']  
})
export class VehiculesComponent implements OnInit {
  private apiUrl = environment.apiUrl;  

  vehicles: Vehicle[] = [];  
  paginatedVehicles: Vehicle[] = [];  
  currentPage: number = 1;  
  itemsPerPage: number = 5;  
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVehicles();  
  }

  
  getVehicles(): void {
    this.http.get<Vehicle[]>(this.apiUrl).subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;  
        this.updatePagination();  
        console.log('Modelos del vehículo:', this.vehicles.map(vehicle => vehicle));
        console.log('Total de vehículos:', this.vehicles.length);
      },
      (error) => {
        console.error('Error al obtener los vehículos', error);
      }
    );
  }

  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVehicles = this.vehicles.slice(startIndex, endIndex); 
    console.log('Vehículos en la página actual:', this.paginatedVehicles);
  }

  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      console.log('Página siguiente, página actual:', this.currentPage);
    }
  }

  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      console.log('Página anterior, página actual:', this.currentPage);
    }
  }


  get totalPages(): number {
    return Math.ceil(this.vehicles.length / this.itemsPerPage);
  }
}
