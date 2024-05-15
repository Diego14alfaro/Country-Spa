import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore, RegionCountries } from '../interfaces/cache-store.interface';



@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private http: HttpClient ) { }

  private getCountriesRequest( url : string): Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError(() => of ([])),

    );

  }

  private apiUrl: string = 'https://restcountries.com/v3.1'

  //public cacheStore: CacheStore  = {
    //byCapital: {term: '', countries: []},
    //byCountries: {term: '', countries: []},
    //byRegion: {region: '',  countries: []},
  //}


  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${this.apiUrl }/alpha/${code}`;
    return this.http.get<Country[]>( url )
    .pipe(
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError(() => of(null))
  );}


  searchCapital( term: string): Observable<Country[]>{
    const url = `${this.apiUrl }/capital/${term}`;
    return this.getCountriesRequest(url);
  }

    searchCountry(term: string): Observable<Country[]>{
      const url = `${this.apiUrl }/name/${term}`;
      return this.getCountriesRequest(url);
    }


    searchRegion(region: string): Observable<Country[]>{
      const url = `${this.apiUrl }/region/${region}`;
      return this.getCountriesRequest(url);


    }
  }




