import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  zipCodeValue!: string;
  forecastData: any;
  filteredForeCastList = [];
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
  ) {
    this.route.params.subscribe((data: any) => {
      this.zipCodeValue = data.zipcode;
    });
  }

  ngOnInit() {
    this.getForecastData();
  }

  getForecastData(): void {
    this.weatherService
      .getForecastData(this.zipCodeValue)
      .subscribe((data: any) => {
        if (data) {
          this.forecastData = data;
          this.forecastData.list.forEach((data: any, i: number) => {
            this.forecastData.list[i] = {
              ...this.forecastData.list[i],
              dt_txt: new Date(data.dt * 1000),
            };
          });
        }
      });
  }

}
