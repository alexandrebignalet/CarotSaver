import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';

import { MENU_ROUTE, MenuComponent } from './';
import {MenuEditComponent} from "./menu-edit/menu-edit.component";

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(MENU_ROUTE , { useHash: true })
    ],
    declarations: [
        MenuComponent,
        MenuEditComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule {}
