import { Route } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import {MealComponent} from "./meal.component";

export const MEAL_ROUTE: Routes = [
    {
        path: 'carot-saver-meal',
        component: MealComponent,
        data: {
            authorities: [],
            pageTitle: 'Welcome, Java Hipster!'
        }
    }
];
