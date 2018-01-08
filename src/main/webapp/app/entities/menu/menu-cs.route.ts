import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MenuCsComponent } from './menu-cs.component';
import { MenuCsDetailComponent } from './menu-cs-detail.component';
import { MenuCsPopupComponent } from './menu-cs-dialog.component';
import { MenuCsDeletePopupComponent } from './menu-cs-delete-dialog.component';

export const menuRoute: Routes = [
    {
        path: 'menu-cs',
        component: MenuCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'menu-cs/:id',
        component: MenuCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuPopupRoute: Routes = [
    {
        path: 'menu-cs-new',
        component: MenuCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-cs/:id/edit',
        component: MenuCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-cs/:id/delete',
        component: MenuCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
