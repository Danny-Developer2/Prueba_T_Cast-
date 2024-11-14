import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { of } from "rxjs";
import { PaginatedResult } from "src/app/_models/pagination";
import { Vehicle } from "src/app/_models/vehicle";
import { VehicleParams } from "src/app/_models/vehicleParams";
import { setPaginatedResponse, setPaginationHeaders } from "src/app/_services/paginationHelper";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VehiclesService {
    private http = inject(HttpClient);
    baseUrl = `${environment.apiUrl}vehicles/`;
    paginatedResult = signal<PaginatedResult<Vehicle[]> | null>(null);
    cache = new Map();
    params = signal<VehicleParams>(new VehicleParams());
  
    resetVehicleParams() {
      this.params.set(new VehicleParams());
    }
  
    getVehicles() {
      const response = this.cache.get(Object.values(this.params()).join('-'));
  
      if (response) {
        const respuesta = setPaginatedResponse(response, this.paginatedResult);
        return respuesta;
      }

      let params = setPaginationHeaders(this.params().pageNumber!, this.params().pageSize!);
  
      params = params.append('orderBy', this.params().orderBy);
  
      return this.http.get<Vehicle[]>(this.baseUrl, {observe: 'response', params}).subscribe({
        next: response => {
          const respuesta = setPaginatedResponse(response, this.paginatedResult);
          this.cache.set(Object.values(this.params()).join('-'), response);
        }
      })
    }
  
    getByIdAync(id: number) {
      const itemToReturn: Vehicle = [...this.cache.values()]
        .reduce((arr, elem) => arr.concat(elem.body), [])
        .find((m: Vehicle) => m.id === id);
  
      if (itemToReturn) return of(itemToReturn);
  
      return this.http.get<Vehicle>(`${this.baseUrl}${id}`);
    }
  
    update(model: any, id: number) {
      return this.http.put(`${this.baseUrl}${id}`, model).pipe(

      )
    }
}