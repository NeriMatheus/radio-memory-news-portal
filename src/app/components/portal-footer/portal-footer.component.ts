import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.scss']
})

export class PortalFooterComponent {
  
  // Obtém dinamicamente o ano atual para exibição nos direitos autorais
  anoAtual: number = new Date().getFullYear();
}