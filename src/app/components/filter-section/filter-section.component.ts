// Cabeçalho
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss']
})
export class FilterSectionComponent {
  
  // Propriedades
  @Input() termoBusca: string = '';
  @Input() categoriaSelecionada: string = '';
  @Input() categoriasDisponiveis: string[] = [];

  @Output() termoBuscaChange = new EventEmitter<string>();
  @Output() categoriaSelecionadaChange = new EventEmitter<string>();
  @Output() filtrar = new EventEmitter<void>();

  // Métodos
  onBuscaChange(valor: string): void {
    this.termoBusca = valor;
    this.termoBuscaChange.emit(this.termoBusca);
    this.filtrar.emit();
  }

  onCategoriaChange(valor: string): void {
    this.categoriaSelecionada = valor;
    this.categoriaSelecionadaChange.emit(this.categoriaSelecionada);
    this.filtrar.emit();
  }
}