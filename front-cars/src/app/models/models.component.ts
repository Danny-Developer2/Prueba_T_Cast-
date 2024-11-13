import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  
import { environment } from '../../environments/environments.development';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: string[] = []; 

  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVehicleModels();  
  }


  getVehicleModels(): void {
    this.http.get<string[]>(`${this.apiUrl}/models`).subscribe(
      (data) => {
        this.models = data; 
        console.log('Modelos obtenidos:', this.models);
      },
      (error) => {
        console.error('Error al obtener los modelos', error);
      }
    );
  }
}

