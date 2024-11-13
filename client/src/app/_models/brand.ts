export class Brand {
  id: string | null = null;
  name: string | null = null;

  constructor(init?: Partial<Brand>) {
    Object.assign(this, init);
  }
}
