import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-news-detail-modal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './news-detail-modal.component.html',
  styleUrls: ['./news-detail-modal.component.scss']
})
export class NewsDetailModalComponent {
  
  // Recebe o card selecionado para exibição detalhada
  @Input({ required: true }) cardSelecionado!: Card;
  
  // Evento disparado para fechar o modal
  @Output() fechar = new EventEmitter<void>();

  // Injeção do DomSanitizer
  constructor(private sanitizer: DomSanitizer) {}

  // Emite o sinal de fecho para o componente pai
  onFechar(): void {
    this.fechar.emit();
  }

  // Evita que o clique dentro do conteúdo feche o modal
  pararPropagacao(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Sanitiza o conteúdo HTML do corpo do post contra XSS
  sanitizarCorpoHtml(html: string): SafeHtml {
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : '';
  }

  // Sanitiza a URL do iframe do YouTube
  sanitizarVideoUrl(url: string): SafeResourceUrl {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : '';
  }

  // Sanitiza, limpa sujeiras da API e valida a URL externa
  sanitizarLink(url: string): string {
    if (!url) return '#';

    // Remove todos os espaços em branco e a string '%20' caso a API envie de forma literal
    const urlLimpa = url.replace(/\s/g, '').replace(/%20/g, '');

    if (!urlLimpa) {
      return '#';
    }

    try {
      // Valida se a URL é estruturalmente correta após a limpeza
      const urlFinal = new URL(urlLimpa);

      if (urlFinal.protocol !== 'http:' && urlFinal.protocol !== 'https:') {
        return '#';
      }

      return urlFinal.href;
    } catch {
      return '#'; // Retorna '#' se a URL continuar inválida mesmo após a limpeza
    }
  }

  // Verifica se o card possui uma URL externa válida para exibir ou esconder o botão
  possuiLinkValido(): boolean {
    return this.sanitizarLink(this.cardSelecionado.urlPost) !== '#';
  }

  // Abre a URL de forma segura pelo TypeScript, driblando o bloqueio do href no Angular
  abrirLinkNoNavegador(): void {
    const urlSegura = this.sanitizarLink(this.cardSelecionado.urlPost);
    
    if (urlSegura !== '#') {
      window.open(urlSegura, '_blank', 'noopener,noreferrer');
    }
  }
}