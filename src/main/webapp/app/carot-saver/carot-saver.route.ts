import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { CarotSaverComponent } from './';

export const CAROT_SAVER_ROUTE: Route = {
    path: 'carot-saver-main',
    component: CarotSaverComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
