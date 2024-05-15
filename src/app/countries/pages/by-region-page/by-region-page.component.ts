import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region ='Africa'| 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  public countries: Country[] = []
  public regions:Region[] = ['Africa', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;


  constructor(private countriesService: CountriesService){}


  searchByRegion( region: Region): void {

    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countries = countries;
    } )

}
}
