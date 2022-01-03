import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  presentWeatherData: any = new Array();
  zipCode: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private weatherService: WeatherService, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPresentWeatherData();
  }

  getPresentWeatherData(): void {
    const data = JSON.parse(localStorage.getItem('presentWeatherReport')!);
    if (data) {
      this.presentWeatherData = data;
    }

  }

  getPresentWeatherZipCode(zipCodeValue: string): void {
    console.log('1234');
    
    if (zipCodeValue && zipCodeValue !== '') {
      let alreadyExists = false;
      this.presentWeatherData.forEach((resp: any) => {
        alreadyExists = (resp.zipcode === zipCodeValue) ? true : false;
      });
      if (!alreadyExists) {
        this.weatherService.getPresentWeatherData(zipCodeValue).subscribe(
          (data: any) => {
            if (data) {
              data = { ...data, zipcode: zipCodeValue };
              this.presentWeatherData.push(data);
              localStorage.setItem(
                'presentWeatherReport',
                JSON.stringify(this.presentWeatherData)
              );
            }
            this.zipCode = '';
            this._snackBar.open('Zipcode added successfully', 'close', {
              duration: 5000, panelClass: ['success-snackbar'], horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition
            });
          },
          () => {
            this._snackBar.open('Zipcode is Invalid', 'close', {
              duration: 5000, panelClass: ['error-snackbar'], horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition
            });
            this.zipCode = '';
          }
        );
      } else {
        this.zipCode = '';
        this._snackBar.open('Zipcode  already exists', 'close', {
          duration: 5000, panelClass: ['error-snackbar'], horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    } else {
      this._snackBar.open('Please enter Zipcode', 'close', {
        duration: 5000, panelClass: ['error-snackbar'], horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
  }

  removeWeatherDetails(zipCodeValue: string): void {
    if (this.presentWeatherData && this.presentWeatherData.length > 0) {
      this.presentWeatherData = this.presentWeatherData.filter(
        (data: any) => data.zipcode !== zipCodeValue
      );
      localStorage.setItem(
        'presentWeatherReport',
        JSON.stringify(this.presentWeatherData)
      );
    }
  }

}
