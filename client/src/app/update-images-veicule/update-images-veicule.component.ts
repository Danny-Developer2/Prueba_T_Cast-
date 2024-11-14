import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-update-images-veicule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-images-veicule.component.html',
})
export class UpdateImagesVeiculeComponent {
  apiUrl = environment.apiUrl;
  vehicleForm: FormGroup;
  router: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) {
    this.vehicleForm = this.fb.group({
      id: [''],
      model: ['', Validators.required],
      placas: ['', Validators.required],
      doors: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      imageUrl: ['', Validators.required]  // Aquí solo un campo para la URL de la imagen
    });
  }

  // Método que obtiene los detalles del vehículo
  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id'); // Obtener el id del vehículo desde la URL
    if (vehicleId) {
      this.getVehicleDetails(vehicleId); // Llamar al método para obtener los detalles
    }
  }

  // Método para obtener los detalles del vehículo desde la API
  getVehicleDetails(vehicleId: string): void {
    this.http.get(`${this.apiUrl}/${vehicleId}`).subscribe(
      (data: any) => {
        this.vehicleForm.patchValue({
          id: data.id,
          model: data.model,
          placas: data.placas,
          doors: data.doors,
          imageUrl:'' 
        });
      },
      (error) => {
        console.error('Error al obtener los detalles del vehículo:', error);
        alert('Hubo un error al obtener los detalles del vehículo.');
      }
    );
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.vehicleForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const vehicleData = this.vehicleForm.value;

    // Obtener la URL de la imagen ingresada
    const newImageUrl = vehicleData.imageUrl;

    // Verificar si la URL de la imagen es válida
    if (!newImageUrl) {
      alert('Please provide a valid image URL.');
      return;
    }

    // Llamar al método para actualizar la imagen
    this.updateImages(vehicleData.id, newImageUrl).subscribe(
      (data) => {
        console.log('Image successfully updated:', data);
        alert('Image updated successfully!');
        this.vehicleForm.reset();
        this.router.navigate(['/vehicles']);  
      },
      (error) => {
        console.error('Error submitting image:', error);
        alert('Failed to update image!');
      }
    );
  }

  // Método para actualizar solo la imagen en la API
  updateImages(vehicleId: string, imageUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${vehicleId}/images/`, {
      url: imageUrl  // Solo la URL de la imagen
    });
  }
}
