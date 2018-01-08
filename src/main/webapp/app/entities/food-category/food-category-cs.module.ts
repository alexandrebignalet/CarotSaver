import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    FoodCategoryCsService,
    FoodCategoryCsPopupService,
    FoodCategoryCsComponent,
    FoodCategoryCsDetailComponent,
    FoodCategoryCsDialogComponent,
    FoodCategoryCsPopupComponent,
    FoodCategoryCsDeletePopupComponent,
    FoodCategoryCsDeleteDialogComponent,
    foodCategoryRoute,
    foodCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...foodCategoryRoute,
    ...foodCategoryPopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FoodCategoryCsComponent,
        FoodCategoryCsDetailComponent,
        FoodCategoryCsDialogComponent,
        FoodCategoryCsDeleteDialogComponent,
        FoodCategoryCsPopupComponent,
        FoodCategoryCsDeletePopupComponent,
    ],
    entryComponents: [
        FoodCategoryCsComponent,
        FoodCategoryCsDialogComponent,
        FoodCategoryCsPopupComponent,
        FoodCategoryCsDeleteDialogComponent,
        FoodCategoryCsDeletePopupComponent,
    ],
    providers: [
        FoodCategoryCsService,
        FoodCategoryCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverFoodCategoryCsModule {}
