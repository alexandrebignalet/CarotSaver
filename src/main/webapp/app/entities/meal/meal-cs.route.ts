import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MealCsComponent } from './meal-cs.component';
import { MealCsDetailComponent } from './meal-cs-detail.component';
import { MealCsPopupComponent } from './meal-cs-dialog.component';
import { MealCsDeletePopupComponent } from './meal-cs-delete-dialog.component';

export const mealRoute: Routes = [
    {
        path: 'meal-cs',
        component: MealCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'meal-cs/:id',
        component: MealCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealPopupRoute: Routes = [
    {
        path: 'meal-cs-new',
        component: MealCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meal-cs/:id/edit',
        component: MealCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meal-cs/:id/delete',
        component: MealCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
