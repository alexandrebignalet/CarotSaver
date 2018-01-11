import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { CarotSaverSharedModule } from '../../shared';
import {MEAL_ROUTE} from "./meal.route";
import {MealComponent} from "./meal.component";
import {MealEditComponent} from "./meal-edit/meal-edit.component";


@NgModule({
    imports: [
        CarotSaverSharedModule,
        AngularMultiSelectModule,
        RouterModule.forRoot(MEAL_ROUTE , { useHash: true })
    ],
    declarations: [
        MealComponent,
        MealEditComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealModule {}
