import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    DishCsService,
    DishCsPopupService,
    DishCsComponent,
    DishCsDetailComponent,
    DishCsDialogComponent,
    DishCsPopupComponent,
    DishCsDeletePopupComponent,
    DishCsDeleteDialogComponent,
    dishRoute,
    dishPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dishRoute,
    ...dishPopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DishCsComponent,
        DishCsDetailComponent,
        DishCsDialogComponent,
        DishCsDeleteDialogComponent,
        DishCsPopupComponent,
        DishCsDeletePopupComponent,
    ],
    entryComponents: [
        DishCsComponent,
        DishCsDialogComponent,
        DishCsPopupComponent,
        DishCsDeleteDialogComponent,
        DishCsDeletePopupComponent,
    ],
    providers: [
        DishCsService,
        DishCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverDishCsModule {}
