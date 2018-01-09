import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MealRateCsComponent } from './meal-rate-cs.component';
import { MealRateCsDetailComponent } from './meal-rate-cs-detail.component';
import { MealRateCsPopupComponent } from './meal-rate-cs-dialog.component';
import { MealRateCsDeletePopupComponent } from './meal-rate-cs-delete-dialog.component';

export const mealRateRoute: Routes = [
    {
        path: 'meal-rate-cs',
        component: MealRateCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'meal-rate-cs/:id',
        component: MealRateCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealRatePopupRoute: Routes = [
    {
        path: 'meal-rate-cs-new',
        component: MealRateCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meal-rate-cs/:id/edit',
        component: MealRateCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meal-rate-cs/:id/delete',
        component: MealRateCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MealRates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
