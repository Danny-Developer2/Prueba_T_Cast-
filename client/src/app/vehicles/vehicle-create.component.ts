import { AbstractType, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  AbstractControl,
  FormControl,
  Validators,
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
  imports: [ ReactiveFormsModule],
  templateUrl: './vehicle-create.component.html',
})
export class VehicleCreateComponent {
  service = inject(VehiclesService);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    brand: new FormControl<SeletOption | null>(null, Validators.required) as any,
    model: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]) as any,
    color: new FormControl<string | null>(null, Validators.required) as any,
    year: new FormControl<number | null>(null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]) as any,
    photos: new FormArray<FormGroup<PhotoType>>([]) as any,
  });

  constructor() {}

  get photosArray(): FormArray<FormGroup<PhotoType>> {
    return this.form.get('photos') as FormArray<FormGroup<PhotoType>>;
  }

  addPhoto() {
    const photoGroup = new FormGroup<PhotoType>({
      id: new FormControl<number | null>(null),
      url: new FormControl<string | null>(null, Validators.required),
    });
    this.photosArray.push(photoGroup);
  }

  removePhoto(index: number) {
    if (this.photosArray.length > 0) {
      this.photosArray.removeAt(index);
    }
  }

  createNewVehicle() {
    if (this.form.valid) {
      this.service.createVehicle(this.form.value).subscribe({
        next: (response) => {
          console.log('Vehicle created successfully');
          this.form.reset();
          this.photosArray.clear(); // Limpia el array de fotos tras el envío
        },
        error: (error) => {
          console.error('Error creating vehicle', error);
        },
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
