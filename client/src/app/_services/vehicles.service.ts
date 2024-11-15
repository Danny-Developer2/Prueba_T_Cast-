import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { of } from "rxjs";
import { PaginatedResult } from "src/app/_models/pagination";
import { Photo } from "src/app/_models/photo";
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
      const cacheKey = Object.values(this.params()).join('-');
      const cachedResponse = this.cache.get(cacheKey);
    
      if (cachedResponse) {
        setPaginatedResponse(cachedResponse, this.paginatedResult);
        return;
      }
    
      let params = setPaginationHeaders(this.params().pageNumber!, this.params().pageSize!);
      params = params.append('orderBy', this.params().orderBy);
    
      return this.http.get<Vehicle[]>(this.baseUrl, { observe: 'response', params }).subscribe({
        next: response => {
          setPaginatedResponse(response, this.paginatedResult);
          this.cache.set(cacheKey, response);
        },
        error: err => {
          console.error('Error al obtener los vehículos:', err);
        }
      });
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

    deletePhoto(photo: Photo){
      return this.http.delete(this.baseUrl + '/delete-photo-card/' + photo.id).pipe()
      
    }

    createVehicle(vehicleData: any) {
      return this.http.post(`${this.baseUrl}`, vehicleData).pipe();
    }
}