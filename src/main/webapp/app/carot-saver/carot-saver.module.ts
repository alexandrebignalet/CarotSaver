import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../shared';

import { CAROT_SAVER_ROUTE, CarotSaverComponent } from './';
import {MenuModule} from "./menu/menu.module";
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
    imports: [
        CarotSaverSharedModule,
        MenuModule,
        DashboardModule,
        RouterModule.forRoot([ CAROT_SAVER_ROUTE ], { useHash: true })
    ],
    declarations: [
        CarotSaverComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverMainModule {}
