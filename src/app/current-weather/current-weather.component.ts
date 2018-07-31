import {Component, OnInit} from '@angular/core';
import {ICurrentWeather} from '../interfaces';
import {WeatherService} from '../weather/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  currentWeather: ICurrentWeather;
  currentWeatherFull;
  chart = [];

  constructor(private weatherService: WeatherService) {
    // this.current = {
    // city: 'Kyiv',
    // country: 'UA',
    // date: new Date(),
    // image: 'assets/img/sunny.svg',
    // temperature: 72,
    // description: 'sunny'
    // } as ICurrentWeather;
  }

  ngOnInit() {
    this.weatherService.getCurrentWeather('Kiev', 'UA')
      .subscribe(data => {this.currentWeather = data;
      // console.log(data)
      });
    // this.weatherService.getCurrentWeatherFull('Kiev', 'UA')
    //   .subscribe(res => console.log(res));

    this.weatherService.dailyForecast('Kiev', 'UA')
      .subscribe(data => {
        console.log(data);
        let temp_max = data['list'].map(res => this.weatherService.convertKelvinToCelsius(res.main.temp_max));
        let temp_min = data['list'].map(res => this.weatherService.convertKelvinToCelsius(res.main.temp_min));
        let allDates = data['list'].map(res => res.dt);
        let weatherDates = [];
        allDates.forEach((res) => {
          let jsdate = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en',
            { year: 'numeric', month: 'short', day: 'numeric'}));
            // { month: 'short', day: 'numeric'}));
        });

        console.log(weatherDates);

        // 'canvas' has to must much to id:  <canvas id='canvas'> in html. Type: 'polarArea', 'line', 'radar', 'pie', 'doughnut',
        // 'bubble', 'scatter', 'bar', 'horizontalBar'
        this.chart = new Chart('canvas', {
          type: 'radar',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [ {
                display: true
              } ],
              yAxes:[{
                display: true
              } ]
            }
          }
        });

      } );
    }

}
