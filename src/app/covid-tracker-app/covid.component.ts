import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

interface Covid {
    number: number,
    country: string,
    newConfirmed?: string,
    newDeath?: string,
    newRecovered?: string,
    totalConfirmed?: string,
    totalDeath?: string,
    totalRecovered?: string
}

@Component({
    selector: "covid",
    templateUrl: "covid.component.html"
})

export class CovidComponent {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<Covid>([]);
  public displayedColumns: string[] = [
      'number', 
      'country', 
      'newConfirmed', 
      'newDeath', 
      'newRecovered', 
      'totalConfirmed', 
      'totalDeath', 
      'totalRecovered'
  ];

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];
  view: any[] = [800, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private readonly COVID_API = "https://api.covid19api.com/summary";

  constructor(private http: HttpClient) {}

  ngOnInit() {
      this.getData();
      this.dataSource.paginator = this.paginator;
  }

  getData() {
      this.http.get(this.COVID_API).subscribe(data => {
        this.dataSource.data = data['Countries'];
      }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  single2 = [
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ]

}