import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { CovidComponent } from './covid.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoutriesComponent } from './countries/countires.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CovidService } from './covid.service';
import { GoogleChartsModule } from 'angular-google-charts';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: CovidComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', component: HomeComponent},
        { path: 'countries', component: CoutriesComponent}
    ] },
]

@NgModule({
    imports: [
        FormsModule, 
        FontAwesomeModule, 
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSliderModule,
        GoogleChartsModule,
        MatSelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CovidComponent, CoutriesComponent, NavComponent, HomeComponent, DashboardComponent],
    providers: [CovidService]
})

export class CovidModule {}