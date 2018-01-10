import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { SatisfactionSurveyComponent } from './satisfaction-survey.component';

export const SURVEY_ROUTE: Route = {
    path: 'survey',
    component: SatisfactionSurveyComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
