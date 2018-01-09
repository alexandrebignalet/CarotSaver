import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    MealRateCsService,
    MealRateCsPopupService,
    MealRateCsComponent,
    MealRateCsDetailComponent,
    MealRateCsDialogComponent,
    MealRateCsPopupComponent,
    MealRateCsDeletePopupComponent,
    MealRateCsDeleteDialogComponent,
    mealRateRoute,
    mealRatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...mealRateRoute,
    ...mealRatePopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MealRateCsComponent,
        MealRateCsDetailComponent,
        MealRateCsDialogComponent,
        MealRateCsDeleteDialogComponent,
        MealRateCsPopupComponent,
        MealRateCsDeletePopupComponent,
    ],
    entryComponents: [
        MealRateCsComponent,
        MealRateCsDialogComponent,
        MealRateCsPopupComponent,
        MealRateCsDeleteDialogComponent,
        MealRateCsDeletePopupComponent,
    ],
    providers: [
        MealRateCsService,
        MealRateCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverMealRateCsModule {}
