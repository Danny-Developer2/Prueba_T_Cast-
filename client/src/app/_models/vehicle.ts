import { Brand } from "src/app/_models/brand";
import { Photo } from "src/app/_models/photo";

export class Vehicle {
  id: number | null = null;

  model: string | null = null;
  year: number | null = null;
  color: string | null = null;
  
  brand: Brand | null = null;

  photos: Photo[] | null = null;

  constructor(init?: Partial<Vehicle>) {
    Object.assign(this, init);
  }
}
