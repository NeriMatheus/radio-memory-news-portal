import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { map, tap } from 'rxjs/operators'; 
import { environment } from '../../environments/environment'; 
import { Card } from '../models/card.model';  

@Injectable({ 
  providedIn: 'root'
})

export class CardService { 
  private apiUrl = environment.apiBaseUrl;
  private token = environment.apiToken;

  constructor(private http: HttpClient) {}

  // Requisição para buscar todos os posts da API com tipagem forte
  getTodosCards(): Observable<Card[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}` 
    });

    const body = { acao: 'getTodosCards' };

    return this.http.post<Card[]>(this.apiUrl, body, { headers }).pipe(
      
      // Imprime os dados puros no console
      tap(cards => console.log('DEBUG - Dados brutos da API:', cards)),

      // Filtra preventivamente os cards ativos logo na origem do serviço
      map(cards => Array.isArray(cards) ? cards.filter(card => card.status === 1) : [])
    );
  
  }
}