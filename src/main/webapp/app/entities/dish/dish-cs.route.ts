import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DishCsComponent } from './dish-cs.component';
import { DishCsDetailComponent } from './dish-cs-detail.component';
import { DishCsPopupComponent } from './dish-cs-dialog.component';
import { DishCsDeletePopupComponent } from './dish-cs-delete-dialog.component';

export const dishRoute: Routes = [
    {
        path: 'dish-cs',
        component: DishCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dishes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dish-cs/:id',
        component: DishCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dishes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dishPopupRoute: Routes = [
    {
        path: 'dish-cs-new',
        component: DishCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dishes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dish-cs/:id/edit',
        component: DishCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dishes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dish-cs/:id/delete',
        component: DishCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dishes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
