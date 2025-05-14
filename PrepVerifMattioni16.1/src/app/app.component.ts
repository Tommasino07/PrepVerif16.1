import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Prenotazione } from './prenotazione.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaPrenotazioniComponent } from './lista-prenotazioni/lista-prenotazioni.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaPrenotazioniComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PrepVerifMattioni16.1';
  vettPrenotazioni: Prenotazione[] = []
  http: HttpClient;
  o!: Observable<Prenotazione[]>;
  loading: boolean  = false;
  oPost!: Observable<any>;
  postData : any;
 
  constructor(http: HttpClient) {
    this.http = http;

    this.makeRequest();

  }

  makeRequest(): void {
    //Notifichiamo che stiamo attendendo dei dati
    this.loading = true;
    //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
    this.o = this.http.get<Prenotazione[]>('https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni');
    //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la 
    //risposta
    this.o.subscribe(this.getData);
  }
  //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
  getData = (d: Prenotazione[]) => {
    this.vettPrenotazioni = d; //Notifico l’oggetto ricevuto dal server
    console.log(this.vettPrenotazioni);
    this.loading = false;  // Notifico che ho ricevuto i dati
  }


  salva(nome: HTMLInputElement, cognome: HTMLInputElement, indirizzo: HTMLInputElement, telefono: HTMLInputElement, email: HTMLInputElement, dataprenotazione: HTMLInputElement, oraprenotazione: HTMLInputElement) : boolean {
    console.log(nome.value, cognome.value, indirizzo.value, telefono.value, email.value, dataprenotazione.value, oraprenotazione.value)
    let prenotazione= new Prenotazione(nome.value, cognome.value, indirizzo.value, telefono.value, email.value, dataprenotazione.value, oraprenotazione.value);
    this.vettPrenotazioni.push(prenotazione)
    this.makePost(prenotazione);
    
    return false;

  }
  makePost(prenotazione : Prenotazione): void {
    // Definisco i dati da spedire
    let dataToSend = JSON.stringify(prenotazione);

    this.loading = true;

    //Faccio la richiesta post
    this.oPost = this.http.post('https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni', dataToSend)
    this.oPost.subscribe(this.getPostResponse);
  }

  getPostResponse = (data : Object) => {
    this.postData = data;
    this.loading = false;

    console.log(data);
  }

}

