import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../shared';
import { ChartsModule } from 'ng2-charts';

import { CAROT_SAVER_ROUTE, CarotSaverComponent } from './';
import {MenuModule} from "./menu/menu.module";
import {MealModule} from "./meal/meal.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {ChartsModule} from 'ng2-charts';

@NgModule({
    imports: [
        CarotSaverSharedModule,
        MenuModule,
        ChartsModule,
        MealModule,
        DashboardModule,
        RouterModule.forRoot([ CAROT_SAVER_ROUTE ], { useHash: true }),
        ChartsModule
    ],
    declarations: [
        CarotSaverComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverMainModule {}
