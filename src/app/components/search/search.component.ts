import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  artistas:any[] = [];
  loading: boolean;

  constructor( private spotify:SpotifyService ) {
    console.log("search component");
  }

  buscar( artista: string ){
    this.loading = true;
    this.spotify.getArtistas( artista )
      .subscribe((resp : any) => {
        this.artistas = resp;
        this.loading = false;
    });
  }

}
