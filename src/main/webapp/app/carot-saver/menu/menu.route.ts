import { Route } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { MenuComponent } from './';
import {MenuEditComponent} from "./menu-edit/menu-edit.component";

export const MENU_ROUTE: Routes = [
    {
        path: 'carot-saver-menu',
        component: MenuComponent,
        data: {
            authorities: [],
            pageTitle: 'Welcome, Java Hipster!'
        }
    },
    {
        path: 'carot-saver-menu-edit',
        component: MenuEditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
