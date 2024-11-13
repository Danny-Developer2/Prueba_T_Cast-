import { BaseParams } from "src/app/_models/baseParams";

export class VehicleParams extends BaseParams {
  term: string | null = null;
  year: number | null = null;

  orderBy = 'lastActive';

  constructor(init?: Partial<VehicleParams>) {
    super();
    Object.assign(this, init);
  }
}
