import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    MealCsService,
    MealCsPopupService,
    MealCsComponent,
    MealCsDetailComponent,
    MealCsDialogComponent,
    MealCsPopupComponent,
    MealCsDeletePopupComponent,
    MealCsDeleteDialogComponent,
    mealRoute,
    mealPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mealRoute,
    ...mealPopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MealCsComponent,
        MealCsDetailComponent,
        MealCsDialogComponent,
        MealCsDeleteDialogComponent,
        MealCsPopupComponent,
        MealCsDeletePopupComponent,
    ],
    entryComponents: [
        MealCsComponent,
        MealCsDialogComponent,
        MealCsPopupComponent,
        MealCsDeleteDialogComponent,
        MealCsDeletePopupComponent,
    ],
    providers: [
        MealCsService,
        MealCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverMealCsModule {}
