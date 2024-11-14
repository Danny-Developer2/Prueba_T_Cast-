import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-update-images',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-images.component.html',
  styleUrls: ['./update-images.component.css']
})
export class UpdateImagesComponent implements OnInit {

  apiUrl = environment.apiUrl;
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializa el FormGroup con las estructuras necesarias
    this.vehicleForm = this.fb.group({
      model: [''],
      placas: [''],
      doors: [''],
      modelos: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Obtener el ID del vehículo desde la URL
    this.route.params.subscribe(params => {
      const vehicleId = params['id'];
      if (vehicleId) {
        this.getVehicleDetails(vehicleId);
      }
    });
  }

  get modelos(): FormArray {
    return this.vehicleForm.get('modelos') as FormArray;
  }

  get images(): FormArray {
    return this.vehicleForm.get('images') as FormArray;
  }

  addModel(): void {
    this.modelos.push(this.fb.group({
      modelo: ['']
    }));
  }

  addImage(): void {
    this.images.push(this.fb.group({
      url: [''],
      vehicleId: [uuidv4()] // Genera un nuevo UUID para cada imagen
    }));
  }

  getVehicleDetails(vehicleId: string): void {
    this.http.get<any>(`${this.apiUrl}/${vehicleId}`).subscribe(
      data => {
        // Carga los datos del vehículo en el formulario
        this.vehicleForm.patchValue({
          model: data.model,
          placas: data.placas,
          doors: data.doors
        });

        // Carga los modelos e imágenes en los form arrays
        data.modelos.forEach((modelo: any) => {
          this.addModel();
          this.modelos.at(this.modelos.length - 1).patchValue(modelo);
        });

        data.images.forEach((image: any) => {
          this.addImage();
          this.images.at(this.images.length - 1).patchValue(image);
        });
      },
      error => {
        console.error('Error al obtener los detalles del vehículo:', error);
        alert('Hubo un error al obtener los detalles del vehículo.');
      }
    );
  }

  onSubmit(): void {
    console.log('Formulario enviado:', this.vehicleForm.value);
    if (this.vehicleForm.valid) {
      // Aquí podrías llamar al método de actualización de tu API
      this.updateVehicle(this.vehicleForm.value).subscribe(
        response => {
          console.log('Vehículo actualizado con éxito:', response);
          alert('Vehículo actualizado con éxito');
          this.router.navigate(['/vehicles']);
        },
        error => {
          console.error('Error al actualizar el vehículo:', error);
        }
      );
    }
  }

  updateVehicle(vehicleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${vehicleData.id}`, vehicleData);
  }
}
