import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../shared';

import { SURVEY_ROUTE, SatisfactionSurveyComponent } from './';

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot([ SURVEY_ROUTE ], { useHash: true })
    ],
    declarations: [
        SatisfactionSurveyComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SatisfactionSurveyModule {}
