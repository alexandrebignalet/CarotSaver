import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { CarotSaverSharedModule } from '../shared';

import { CAROT_SAVER_ROUTE, CarotSaverComponent } from './';
import {MenuModule} from "./menu/menu.module";

@NgModule({
    imports: [
        ChartsModule,
        CarotSaverSharedModule,
        MenuModule,
        RouterModule.forRoot([ CAROT_SAVER_ROUTE ], { useHash: true })
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
