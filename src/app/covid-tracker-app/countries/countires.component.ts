import { CovidService } from './../covid.service';
import { IGlobalDataSummary, IDateWiseData } from './../covid.i';
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
    selector: "countries",
    templateUrl: "countries.component.html"
})

export class CoutriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    public data: IGlobalDataSummary[];
    public countries: string[] = [];
    public totalConfirmed: number = 0;
    public totalActive: number = 0;
    public totalDeaths: number = 0;
    public totalRecovered: number = 0;
    public selectedCountryData: IDateWiseData[] = [];
    public dataSource = new MatTableDataSource([]);
    public dateWiseData;
    public displayedColumns: string[] = [
      'number', 
      'date', 
      'cases', 
  ];
    public datatable = [['Locale', 'Number']];
   
    public chart = {
      GeoChart: "GeoChart",
      height: 500, 
      options: {
      colorAxis: {colors: ['#e7711c', '#4374e0']}}
    }

    constructor(private covidService: CovidService) {}

    ngOnInit(): void {
      merge(
        this.covidService.getDateWiseData().pipe(
          map(result=>{
            this.dateWiseData = result;
          })
        ), 
        this.covidService.getGlobalData().pipe(map(result=>{
          this.data = result;
          this.data.forEach(cs=>{
            this.countries.push(cs.country)
          })
        }))
      ).subscribe(
        {
          complete : ()=>{
           this.updateValues('US');
           this.updateChart();
          }
        }
      )
    }
  
    updateChart() {
      this.data.forEach(cs=> {
        this.datatable.push([cs.country, cs.confirmed + '']);
      })
    }
  
    updateValues(country : string){
      this.data.forEach(cs=>{
        if(cs.country == country){
          this.totalActive = cs.active
          this.totalDeaths = cs.deaths
          this.totalRecovered = cs.recovered
          this.totalConfirmed = cs.confirmed
        }
      })
  
      this.selectedCountryData  = this.dateWiseData[country]
      this.dataSource = this.dateWiseData[country];
      this.updateChart();
      
    }
}