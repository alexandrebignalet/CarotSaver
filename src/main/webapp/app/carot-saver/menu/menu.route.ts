import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MenuComponent } from './';

export const MENU_ROUTE: Route = {
    path: 'carot-saver-menu',
    component: MenuComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
