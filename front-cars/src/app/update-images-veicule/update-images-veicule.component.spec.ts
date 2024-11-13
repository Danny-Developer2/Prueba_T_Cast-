import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImagesVeiculeComponent } from './update-images-veicule.component';

describe('UpdateImagesVeiculeComponent', () => {
  let component: UpdateImagesVeiculeComponent;
  let fixture: ComponentFixture<UpdateImagesVeiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateImagesVeiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateImagesVeiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
