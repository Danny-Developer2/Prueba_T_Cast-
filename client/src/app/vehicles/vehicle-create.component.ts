import { AbstractType, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { SeletOption } from 'src/app/_models/selectOption';

type PhotoType = {
  id: AbstractControl<number | null>;
  url: AbstractControl<string | null>;
};

type FormType = {
  model: AbstractControl<string | null>;
  year: AbstractControl<number | null>;
  color: AbstractControl<string | null>;
  brand: AbstractControl<SeletOption | null>;
  photos: FormArray<FormGroup<PhotoType>>;
};

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle-create.component.html',
})
export class VehicleCreateComponent {

  service = inject(VehiclesService);

  form:FormGroup<FormType> = new FormGroup<FormType>({
    brand: new FormControl<SeletOption | null>(null) as any,
    model: new FormControl<string | null>(null)as any,
    color: new FormControl< string | null>(null) as any,
    year: new FormControl <number | null>(null) as any,
    photos: new FormArray([]) as any
  })

  constructor() {}

  createNewVehicle() {
    this.service.createVehicle(this.form.value).subscribe({
      next: (response) => {
      console.log("Vehicle create")
      },
      error: (error) => {
        console.error('Error creating vehicle', error);
      },
    });
  }
}
