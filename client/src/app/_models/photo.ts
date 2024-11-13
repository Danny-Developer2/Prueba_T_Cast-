export class Photo {
  id: string | null = null;
  url: string | null = null;

  constructor(init?: Partial<Photo>) {
    Object.assign(this, init);
  }
}
