export class BaseParams {
  pageNumber: number | null = null;
  pageSize: number | null = null;

  constructor(init?: Partial<BaseParams>) {
    Object.assign(this, init);
  }
}
