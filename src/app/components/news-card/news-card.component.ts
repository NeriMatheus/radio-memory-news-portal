import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  
  // Recebe os dados individuais de cada card
  @Input({ required: true }) card!: Card;
  
  // Evento disparado ao clicar no card para abrir detalhes
  @Output() abrir = new EventEmitter<Card>();

  isFixado: boolean = false;

  ngOnInit(): void {
    this.isFixado = this.verificarSeFixado();
  }

  // Emite o card atual para o componente pai ao clicar no card
  onClick(): void {
    this.abrir.emit(this.card);
  }

  // Verifica se o card está atualmente fixado com base na data válida
  private verificarSeFixado(): boolean {
    if (!this.card.data_fixo) return false;
    const agora = new Date();
    return new Date(this.card.data_fixo) >= agora;
  }
}