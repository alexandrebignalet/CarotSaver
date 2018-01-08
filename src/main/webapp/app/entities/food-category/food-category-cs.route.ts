import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FoodCategoryCsComponent } from './food-category-cs.component';
import { FoodCategoryCsDetailComponent } from './food-category-cs-detail.component';
import { FoodCategoryCsPopupComponent } from './food-category-cs-dialog.component';
import { FoodCategoryCsDeletePopupComponent } from './food-category-cs-delete-dialog.component';

export const foodCategoryRoute: Routes = [
    {
        path: 'food-category-cs',
        component: FoodCategoryCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FoodCategories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'food-category-cs/:id',
        component: FoodCategoryCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FoodCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const foodCategoryPopupRoute: Routes = [
    {
        path: 'food-category-cs-new',
        component: FoodCategoryCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FoodCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'food-category-cs/:id/edit',
        component: FoodCategoryCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FoodCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'food-category-cs/:id/delete',
        component: FoodCategoryCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FoodCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
