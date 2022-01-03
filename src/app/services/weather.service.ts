import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  environmentData: any = environment;
  constructor(private httpClient: HttpClient) { }


  getPresentWeatherData(zipCode: string) {
    return this.httpClient.get(this.environmentData.apiUrl + 'weather?zip=' + zipCode + ',in&appid=' + this.environmentData.token);
  }

  getForecastData(zipCode: string) {
    return this.httpClient.get(this.environmentData.apiUrl + 'forecast/daily?zip=' + zipCode + ',in&appid=' + this.environmentData.token);
  }

}
