import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    SatisfactionSurveyCsService,
    SatisfactionSurveyCsPopupService,
    SatisfactionSurveyCsComponent,
    SatisfactionSurveyCsDetailComponent,
    SatisfactionSurveyCsDialogComponent,
    SatisfactionSurveyCsPopupComponent,
    SatisfactionSurveyCsDeletePopupComponent,
    SatisfactionSurveyCsDeleteDialogComponent,
    satisfactionSurveyRoute,
    satisfactionSurveyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...satisfactionSurveyRoute,
    ...satisfactionSurveyPopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SatisfactionSurveyCsComponent,
        SatisfactionSurveyCsDetailComponent,
        SatisfactionSurveyCsDialogComponent,
        SatisfactionSurveyCsDeleteDialogComponent,
        SatisfactionSurveyCsPopupComponent,
        SatisfactionSurveyCsDeletePopupComponent,
    ],
    entryComponents: [
        SatisfactionSurveyCsComponent,
        SatisfactionSurveyCsDialogComponent,
        SatisfactionSurveyCsPopupComponent,
        SatisfactionSurveyCsDeleteDialogComponent,
        SatisfactionSurveyCsDeletePopupComponent,
    ],
    providers: [
        SatisfactionSurveyCsService,
        SatisfactionSurveyCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverSatisfactionSurveyCsModule {}
