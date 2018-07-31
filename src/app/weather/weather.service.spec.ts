import {TestBed, inject, async} from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [WeatherService]
    });
  });

  it('should be created', async(inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  })));
});
