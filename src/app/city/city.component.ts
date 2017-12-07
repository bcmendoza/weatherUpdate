import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  name;
  humidity;
  avgtemp;
  hightemp;
  lowtemp;
  description;
  
  constructor(private _rt: ActivatedRoute, private _http: Http) {
    this._rt.paramMap.subscribe(param => {
      let city = param.get('city');
      let data = this._http.get(`http://api.openweathermap.org/data/2.5/weather?id=${city}&APPID=f317df4f2298c3c9ee93062e360a6d14`).map(res => res.json()).subscribe(
        res => this.updateCity(res),
        err => console.log('error!')
      );
    });
  }

  ngOnInit() {
  }

  updateCity(data){
    console.log(data);
    this.name = data.name;
    this.humidity = data.main.humidity;
    this.avgtemp = data.main.temp;
    this.hightemp = data.main.temp_max;
    this.lowtemp = data.main.temp_min;
    this.description = data.weather[0].description;
  }

}
