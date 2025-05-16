import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Prenotazione } from '../prenotazione.model';

@Component({
  selector: 'app-dettagli-prenotazione',
  imports: [CommonModule],
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrl: './dettagli-prenotazione.component.css'
})
export class DettagliPrenotazioneComponent {
  @Input() prenotazione! : Prenotazione;
  tette: boolean = false;
  estendi(){
    this.tette =  !this.tette;
  }

}
