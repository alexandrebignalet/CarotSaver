import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SatisfactionSurveyCsComponent } from './satisfaction-survey-cs.component';
import { SatisfactionSurveyCsDetailComponent } from './satisfaction-survey-cs-detail.component';
import { SatisfactionSurveyCsPopupComponent } from './satisfaction-survey-cs-dialog.component';
import { SatisfactionSurveyCsDeletePopupComponent } from './satisfaction-survey-cs-delete-dialog.component';

export const satisfactionSurveyRoute: Routes = [
    {
        path: 'satisfaction-survey-cs',
        component: SatisfactionSurveyCsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SatisfactionSurveys'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'satisfaction-survey-cs/:id',
        component: SatisfactionSurveyCsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SatisfactionSurveys'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const satisfactionSurveyPopupRoute: Routes = [
    {
        path: 'satisfaction-survey-cs-new',
        component: SatisfactionSurveyCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SatisfactionSurveys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'satisfaction-survey-cs/:id/edit',
        component: SatisfactionSurveyCsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SatisfactionSurveys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'satisfaction-survey-cs/:id/delete',
        component: SatisfactionSurveyCsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SatisfactionSurveys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
