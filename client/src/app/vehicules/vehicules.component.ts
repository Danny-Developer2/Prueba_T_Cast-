import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Vehicle } from 'src/app/_models/vehicle';

@Component({
  selector: 'app-vehicules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicules.component.html',
})
export class VehiculesComponent {
  paginatedResult = signal<PaginatedResult<Vehicle[]> | null>(null);

  service = inject(VehiclesService);

  constructor() {
    this.service.getVehicles();
    effect(
      () => {
        this.paginatedResult.set(this.service.paginatedResult());
      },
      { allowSignalWrites: true }
    );
  }
  
}
