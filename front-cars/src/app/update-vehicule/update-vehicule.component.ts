import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environments.development';

@Component({
  selector: 'app-update-vehicule',
  standalone: true, // Esto hace que el componente sea independiente
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css'],
})
export class UpdateVehiculeComponent implements OnInit {
  vehicle_Existente: any = {
    id: '',
    model: '',
    placas: '',
    doors: '',
    images: [],
  };

  apiUrl = environment.apiUrl;

  vehicle: any = {
    id: '',
    model: '',
    placas: '',
    doors: '',
    images: [],
  };

  // Constructor con HttpClient
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const vehicleId = params['id'];
      if (vehicleId) {
        this.getVehicleDetails(vehicleId);
      }
    });
  }

  getVehicleDetails(vehicleId: string): void {
    this.http.get(`${this.apiUrl}/${vehicleId}`).subscribe(
      (data: any) => {
        this.vehicle = data;
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
        alert('Hubo un error al obtener los detalles del vehículo.');
      }
    );
  }

  addImage() {
    this.vehicle.images.push({
      url: '',
      vehicleId: this.vehicle.id,
    });
  }

  onSubmit() {
    console.log('Form submitted', this.vehicle);

    this.updateVehicle(this.vehicle).subscribe(
      (data) => {
        console.log('Vehicle successfully updated:', data);
        alert('Vehicle updated successfully!');
        this.router.navigate(['/vehicles']);
      },
      (error) => {
        console.error('Error updating vehicle:', error);
        alert('Failed to update vehicle!');
      }
    );
  }

  updateVehicle(vehicle: any): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      switchMap((data: any) => {
        this.vehicle_Existente = data;

        if (
          this.vehicle_Existente.some((v: any) => v.model === vehicle.model) ||
          this.vehicle_Existente.some((v: any) => v.placas === vehicle.placas)
        ) {
          alert(`Ya existe un auto con estos datos `);
          throw new Error('El auto ya existe');
        }
        return this.http.put(`${this.apiUrl}/${vehicle.id}`, vehicle);
      })
    );
  }
}
