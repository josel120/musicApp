import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  paises: any[] = [];
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private http: HttpClient, private spotify: SpotifyService ) { 
    this.loading = true;
    this.error = false;
    console.log("constructor Home");    
    this.listarNuevasCanciones();
  }

  listarPaises(){
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .subscribe(( resp: any) => {
        this.paises = resp;
      });
  }

  listarNuevasCanciones(){
    this.spotify.getNewReleases()
      .subscribe((resp : any) => {
        this.nuevasCanciones = resp;
        this.loading = false;
        //console.log(resp.albums.items);
    }, (errorServicio) =>{
      this.loading = false;
      this.error = true;
      this.mensajeError = errorServicio.error.error.message;
    });
  }

}
