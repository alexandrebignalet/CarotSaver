import { Route } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import {MealComponent} from "./meal.component";
import {MealEditComponent} from "./meal-edit/meal-edit.component";

export const MEAL_ROUTE: Routes = [
    {
        path: 'carot-saver-meal',
        component: MealComponent,
        data: {
            authorities: [],
            pageTitle: 'Welcome, Java Hipster!'
        }
    },
    {
        path: 'carot-saver-meal-edit',
        component: MealEditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
