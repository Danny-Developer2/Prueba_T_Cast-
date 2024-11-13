import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environments.development';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  vehicle_Existente: any = {
    id: '',
    model: '',
    placas: '',
    doors: '',
    images: []
  };

  apiUrl = environment.apiUrl;
  vehicleForm: FormGroup;
  vehicles: any[] = []; 

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

  
  createModelGroup(): FormGroup {
    return this.fb.group({
      modelo: ['', Validators.required],
      vehicleId: [this.vehicleForm?.get('id')?.value]
    });
  }

  
  createImageGroup(): FormGroup {
    return this.fb.group({
      url: ['', Validators.required],
      vehicleId: [this.vehicleForm?.get('id')?.value]
    });
  }

  
  get modelos(): FormArray {
    return this.vehicleForm.get('modelos') as FormArray;
  }

  get images(): FormArray {
    return this.vehicleForm.get('images') as FormArray;
  }

  
  addImage() {
    this.images.push(this.createImageGroup());
  }

                             
  addModel() {
    this.modelos.push(this.createModelGroup());
  }

  

     
  onSubmit() {
    if (this.vehicleForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const vehicleData = this.vehicleForm.value;

    
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
        this.vehicles.push(vehicleData); 
        this.resetForm();
      },
      (error) => {
        console.error('Error submitting vehicle:', error);
        alert('Failed to add vehicle!');
      }
    );
  }

  addVehicle(vehicle: any): Observable<any> {
    
    return this.http.get(`${this.apiUrl}`).pipe(
      switchMap((data: any) => {
        this.vehicle_Existente = data;

        

        if(
          this.vehicle_Existente.some((v: any) => v.model === vehicle.model) ||
          this.vehicle_Existente.some((v: any) => v.placas === vehicle.placas) 
        ) {
          alert(`Ya existe un auto con estos datos `);
          throw new Error("El auto ya existe");
        }
        return this.http.post(`${this.apiUrl}`, vehicle);
        

        function resetForm() {
          throw new Error('Function not implemented.');
        }
        
        

      })
    );
  }
  

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

