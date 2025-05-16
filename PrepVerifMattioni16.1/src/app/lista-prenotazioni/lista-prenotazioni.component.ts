import { Component, Input } from '@angular/core';
import { Prenotazione } from '../prenotazione.model';
import { CommonModule } from '@angular/common';
import { DettagliPrenotazioneComponent } from '../dettagli-prenotazione/dettagli-prenotazione.component';

@Component({
  selector: 'app-lista-prenotazioni',
  imports: [CommonModule, DettagliPrenotazioneComponent],
  templateUrl: './lista-prenotazioni.component.html',
  styleUrl: './lista-prenotazioni.component.css'
})
export class ListaPrenotazioniComponent {
  @Input() vettPrenotazione: Prenotazione[] = [];
  

}

