import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../shared';

import { SURVEY_ROUTE } from './satisfaction-survey.route';
import {SatisfactionSurveyComponent} from './satisfaction-survey.component';
import { SurveyItemComponent } from './survey-item/survey-item.component';

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot([ SURVEY_ROUTE ], { useHash: true })
    ],
    declarations: [
        SatisfactionSurveyComponent,
        SurveyItemComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SatisfactionSurveyModule {}
