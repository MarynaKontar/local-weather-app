
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ICurrentWeather} from '../interfaces';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string,
  }];
  main: {
    temp: number
  };
  sys: {
    country: string
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  dailyForecast(city: string, country: string) {
   return this.httpClient.get(`${environment.baseUrl}api.openweathermap.org/data/2.5/forecast?` +
     `q=${city},${country}&appid=${environment.appId}`);
  }

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return this.httpClient.get<ICurrentWeatherData>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
      `q=${city},${country}&appid=${environment.appId}`)
      .pipe(map(data => this.transformToICurrentWeather(data)));
  }

  getCurrentWeatherFull(city: string, country: string) {
    return this.httpClient.get(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
      `q=${city},${country}&appid=${environment.appId}`);
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToCelsius(data.main.temp),
      description: data.weather[0].description,
    };

  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67;
  }

  public convertKelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }
}
