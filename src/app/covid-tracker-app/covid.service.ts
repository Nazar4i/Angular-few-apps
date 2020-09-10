import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { IGlobalDataSummary, IDateWiseData } from './covid.i';
 
@Injectable()
export class CovidService {

    private readonly globalData = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-27-2020.csv";
    private readonly dateWiseData = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
    constructor(private http: HttpClient) {}


    getGlobalData() {
        return this.http.get(this.globalData, { responseType: 'text' }).pipe(
            map(result => {
              let raw = {}
              let rows = result.split('\n');
              rows.splice(0, 1);

              rows.forEach(row => {
                let cols = row.split(/,(?=\S)/)
      
                let cs = {
                  country: cols[3],
                  confirmed: +cols[7],
                  deaths: +cols[8],
                  recovered: +cols[9],
                  active: +cols[10],
                };

                let temp: IGlobalDataSummary = raw[cs.country];
                if (temp) {
                  temp.active = cs.active + temp.active
                  temp.confirmed = cs.confirmed + temp.confirmed
                  temp.deaths = cs.deaths + temp.deaths
                  temp.recovered = cs.recovered + temp.recovered
      
                  raw[cs.country] = temp;
                } else {
                  raw[cs.country] = cs;
                }
              })

              return <IGlobalDataSummary[]>Object.values(raw);
            })
          )
    }

    getDateWiseData() {
      return this.http.get(this.dateWiseData, {responseType: 'text'}).pipe(map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let con = cols[1];
          cols.splice(0, 4);
          mainData[con] = [];
          cols.forEach((value, index)=> {
            let dw: IDateWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index]))
            }
            mainData[con].push(dw);
          })
        })
        return mainData;
      }))
    }
}