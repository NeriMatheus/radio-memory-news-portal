import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = enviroment.apiBaseUrl;
  private token = enviroment.apiToken;

  constructor(private http: HttpClient) {}

  getTodosCards(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}` 
    });

    const body = { acao: 'getTodosCards' };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}