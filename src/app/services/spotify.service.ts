import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log("servicio spotify");
  }

  getQuery( query:string ){
    const url= `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAHnd_4h52TBFMTYve0coFXmx5P2ThaDq8jIJlHNRBR9cZSBANRhNnacP9I2qw-1QKZJfW58QSoZmBcvDg'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases( ){
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQD6p6wAYE7LFNp8EFcUdgG3WG5k4wdyA7GX7LU8p1mvPjIPO-sjB7ZSdIw4WTER1y4Q7YPRxBHLwD55Ax0'
    // });
    return this.getQuery('browse/new-releases')
            .pipe( map( data => data['albums'].items ));
    // return this.http.get('https://api.spotify.com/v1/browse/new-releases',{ headers })
    //             .pipe( map( data => data['albums'].items ));
  }

  getArtistas( artista: string ){
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQD6p6wAYE7LFNp8EFcUdgG3WG5k4wdyA7GX7LU8p1mvPjIPO-sjB7ZSdIw4WTER1y4Q7YPRxBHLwD55Ax0'
    // });

    // return this.http.get(`https://api.spotify.com/v1/search?q=${ artista }&type=artist&limit=15`,{ headers })
    //             .pipe( map( data => data['artists'].items ));

    return this.getQuery(`search?q=${ artista }&type=artist&limit=15`)
            .pipe( map( data => data['artists'].items ));
  }

  getArtista( id: string ){
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks( id: string ){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
              .pipe( map( data => data['tracks'] ));
  }
}
