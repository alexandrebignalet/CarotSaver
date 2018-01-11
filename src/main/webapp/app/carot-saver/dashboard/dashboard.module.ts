import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import {LineChartMealsComponent} from "./line-chart-meals.component";

@NgModule({
    imports: [
        ChartsModule
    ],
    declarations: [
        LineChartMealsComponent
    ],
    exports: [
        LineChartMealsComponent
    ],
    providers: [
    ]
})
export class DashboardModule {}
