export class SeletOption {
    id: number | null = null;
    code: string | null = null;
    name: string | null =null
  
    constructor(init?: Partial<SeletOption>) {
      Object.assign(this, init);
    }
  }
  