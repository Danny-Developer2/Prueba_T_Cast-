import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Vehicle } from 'src/app/_models/vehicle';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './vehicles-catalog.component.html',
})
export class VehiclesComponent implements OnInit {
  paginatedResult = signal<PaginatedResult<Vehicle[]> | null>(null);
  vehiclesService = inject(VehiclesService);

  constructor(private http: HttpClient) {
    
    effect(
      () => {
        console.log('Resultado paginado actualizado:', this.paginatedResult());
      },
      { allowSignalWrites: true }
    );
  
  }

  ngOnInit(): void {
    if (!this.vehiclesService.paginatedResult()) this.loadVehicles();
  }

  loadVehicles() {
    this.vehiclesService.getVehicles();
  }

  pageChange(event: any) {
    if (this.vehiclesService.params().pageNumber != event.page) {
      this.vehiclesService.params().pageNumber = event.page;
      this.loadVehicles();
    }
  }
}
