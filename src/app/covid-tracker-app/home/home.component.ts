import { IGlobalDataSummary } from './../covid.i';
import { CovidService } from './../covid.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "home",
    templateUrl: "home.component.html"
})

export class HomeComponent implements OnInit {

    public totalConfirmed: number = 0;
    public totalActive: number = 0;
    public totalDeaths: number = 0;
    public totalRecovered: number = 0;
    public globalData: IGlobalDataSummary[];
    public datatable = [];
    public chart = {
      PieChart : "PieChart" ,
      ColumnChart : 'ColumnChart' ,
      LineChart : "LineChart", 
      height: 400,
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        is3D: true
      }  
    }

    constructor(private covidService: CovidService) {}

    ngOnInit(): void {
        this.covidService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.active
              }
            })
            this.initChart('c');
          }, 
          complete : ()=>{
          }
        }
      )
    }


    initChart(caseType: string) {
        this.datatable = [];
        this.globalData.forEach(cs => {
          let value :number ;
          if (caseType == 'c')
            if (cs.confirmed > 2000)
              value = cs.confirmed
              
          if (caseType == 'a')
            if (cs.active > 2000)
              value = cs.active
          if (caseType == 'd')
            if (cs.deaths > 1000)
              value = cs.deaths
              
          if (caseType == 'r')
            if (cs.recovered > 2000)
                value = cs.recovered
            
    
            this.datatable.push([
                cs.country, value
              ])
        })
    }
    

    updateChart(input: string, val?: number) {
        this.initChart(input)
    }
}