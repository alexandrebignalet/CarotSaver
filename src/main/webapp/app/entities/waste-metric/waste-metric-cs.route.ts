import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { WasteMetricCsComponent } from './waste-metric-cs.component';
import { WasteMetricCsDetailComponent } from './waste-metric-cs-detail.component';
import { WasteMetricCsPopupComponent } from './waste-metric-cs-dialog.component';
import { WasteMetricCsDeletePopupComponent } from './waste-metric-cs-delete-dialog.component';

export const wasteMetricRoute: Routes = [
    {
        path: 'waste-metric-cs',
        component: WasteMetricCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WasteMetrics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'waste-metric-cs/:id',
        component: WasteMetricCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WasteMetrics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wasteMetricPopupRoute: Routes = [
    {
        path: 'waste-metric-cs-new',
        component: WasteMetricCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WasteMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'waste-metric-cs/:id/edit',
        component: WasteMetricCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WasteMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'waste-metric-cs/:id/delete',
        component: WasteMetricCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WasteMetrics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
