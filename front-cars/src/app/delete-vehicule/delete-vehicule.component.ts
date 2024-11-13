import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments.development';

export interface Vehicule {
  id: string;
  model: string;
  placas: string;
  doors: number;
}

@Component({
  selector: 'app-delete-vehicule',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './delete-vehicule.component.html',
  styleUrls: ['./delete-vehicule.component.css'],
})
export class DeleteVehiculeComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  vehicule: Vehicule | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

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
        console.log('Detalles del vehículo:', data);

        this.http.delete(`${this.apiUrl}/${vehicleId}`).subscribe(
          (response) => {
            console.log('Vehículo eliminado con éxito', response);
            this.vehicule = null;

            this.navigateToHome();
          },
          (error) => {
            if (error.status === 200 || error.status === 204) {
              console.log(
                'Eliminación considerada exitosa aunque hubo respuesta de error.'
              );
              this.vehicule = null;
              this.navigateToHome();
            } else {
              console.error('Error al eliminar el vehículo:', error);
            }
          }
        );
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
      }
    );
  }

  private navigateToHome(): void {
    this.router.navigate(['vehicules']).then(() => {
      console.log('Redirigiendo a la página principal...');
    });
  }
}
