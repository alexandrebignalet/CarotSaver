import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    WasteMetricCsService,
    WasteMetricCsPopupService,
    WasteMetricCsComponent,
    WasteMetricCsDetailComponent,
    WasteMetricCsDialogComponent,
    WasteMetricCsPopupComponent,
    WasteMetricCsDeletePopupComponent,
    WasteMetricCsDeleteDialogComponent,
    wasteMetricRoute,
    wasteMetricPopupRoute,
} from './';

const ENTITY_STATES = [
    ...wasteMetricRoute,
    ...wasteMetricPopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WasteMetricCsComponent,
        WasteMetricCsDetailComponent,
        WasteMetricCsDialogComponent,
        WasteMetricCsDeleteDialogComponent,
        WasteMetricCsPopupComponent,
        WasteMetricCsDeletePopupComponent,
    ],
    entryComponents: [
        WasteMetricCsComponent,
        WasteMetricCsDialogComponent,
        WasteMetricCsPopupComponent,
        WasteMetricCsDeleteDialogComponent,
        WasteMetricCsDeletePopupComponent,
    ],
    providers: [
        WasteMetricCsService,
        WasteMetricCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverWasteMetricCsModule {}
