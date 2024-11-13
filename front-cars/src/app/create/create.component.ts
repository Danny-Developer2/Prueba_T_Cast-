import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.development';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  apiUrl = environment.apiUrl;
  vehicleForm: FormGroup;
  vehicles: any[] = []; // Simulación de una lista de vehículos

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      id: [uuidv4()],
      model: ['', Validators.required],
      placas: ['', Validators.required],
      doors: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      modelos: this.fb.array([this.createModelGroup()]),
      images: this.fb.array([this.createImageGroup()])
    });
  }

  // Crear un nuevo FormGroup para un modelo
  createModelGroup(): FormGroup {
    return this.fb.group({
      modelo: ['', Validators.required],
      vehicleId: [this.vehicleForm?.get('id')?.value]
    });
  }

  // Crear un nuevo FormGroup para una imagen
  createImageGroup(): FormGroup {
    return this.fb.group({
      url: ['', Validators.required],
      vehicleId: [this.vehicleForm?.get('id')?.value]
    });
  }

  // Obtiene el FormArray de modelos
  get modelos(): FormArray {
    return this.vehicleForm.get('modelos') as FormArray;
  }

  // Obtiene el FormArray de imágenes
  get images(): FormArray {
    return this.vehicleForm.get('images') as FormArray;
  }

  // Agrega un nuevo campo de imagen
  addImage() {
    this.images.push(this.createImageGroup());
  }

  // Agrega un nuevo campo de modelo
  addModel() {
    this.modelos.push(this.createModelGroup());
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.vehicleForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const vehicleData = this.vehicleForm.value;

    // Verificar la estructura antes de enviar
    vehicleData.images.forEach((image: any) => {
      image.vehicleId = vehicleData.id;
    });

    vehicleData.modelos.forEach((modelo: any) => {
      modelo.vehicleId = vehicleData.id;
    });

    this.addVehicle(vehicleData).subscribe(
      (data) => {
        console.log('Vehicle successfully added:', data);
        alert('Vehicle added successfully!');
        this.vehicles.push(vehicleData); // Agregar a la lista de vehículos
        this.resetForm();
      },
      (error) => {
        console.error('Error submitting vehicle:', error);
        alert('Failed to add vehicle!');
      }
    );
  }

  // Método para enviar el vehículo a la API
  addVehicle(vehicle: any): Observable<any> {
    console.log(this.apiUrl);
    console.log('Vehicle data:', vehicle);
    return this.http.post(`${this.apiUrl}`, vehicle);
  }

  // Resetea el formulario y genera un nuevo ID
  resetForm() {
    this.vehicleForm.reset({
      id: uuidv4(),
      model: '',
      placas: '',
      doors: '',
      modelos: this.fb.array([this.createModelGroup()]),
      images: this.fb.array([this.createImageGroup()])
    });
  }

  
  trackById(index: number, item: any) {
    return item.id;
  }
}
