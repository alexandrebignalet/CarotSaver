import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DishServeCsComponent } from './dish-serve-cs.component';
import { DishServeCsDetailComponent } from './dish-serve-cs-detail.component';
import { DishServeCsPopupComponent } from './dish-serve-cs-dialog.component';
import { DishServeCsDeletePopupComponent } from './dish-serve-cs-delete-dialog.component';

export const dishServeRoute: Routes = [
    {
        path: 'dish-serve-cs',
        component: DishServeCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishServes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dish-serve-cs/:id',
        component: DishServeCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishServes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dishServePopupRoute: Routes = [
    {
        path: 'dish-serve-cs-new',
        component: DishServeCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishServes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dish-serve-cs/:id/edit',
        component: DishServeCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishServes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dish-serve-cs/:id/delete',
        component: DishServeCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DishServes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
