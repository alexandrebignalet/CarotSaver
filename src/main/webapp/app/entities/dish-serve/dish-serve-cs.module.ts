import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    DishServeCsService,
    DishServeCsPopupService,
    DishServeCsComponent,
    DishServeCsDetailComponent,
    DishServeCsDialogComponent,
    DishServeCsPopupComponent,
    DishServeCsDeletePopupComponent,
    DishServeCsDeleteDialogComponent,
    dishServeRoute,
    dishServePopupRoute,
} from './';

const ENTITY_STATES = [
    ...dishServeRoute,
    ...dishServePopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DishServeCsComponent,
        DishServeCsDetailComponent,
        DishServeCsDialogComponent,
        DishServeCsDeleteDialogComponent,
        DishServeCsPopupComponent,
        DishServeCsDeletePopupComponent,
    ],
    entryComponents: [
        DishServeCsComponent,
        DishServeCsDialogComponent,
        DishServeCsPopupComponent,
        DishServeCsDeleteDialogComponent,
        DishServeCsDeletePopupComponent,
    ],
    providers: [
        DishServeCsService,
        DishServeCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverDishServeCsModule {}
