import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CarotSaverFoodCategoryCsModule } from './food-category/food-category-cs.module';
import { CarotSaverMealCsModule } from './meal/meal-cs.module';
import { CarotSaverMenuCsModule } from './menu/menu-cs.module';
import { CarotSaverWasteMetricCsModule } from './waste-metric/waste-metric-cs.module';
import { CarotSaverDishCsModule } from './dish/dish-cs.module';
import { CarotSaverMealRateCsModule } from './meal-rate/meal-rate-cs.module';
import { CarotSaverSatisfactionSurveyCsModule } from './satisfaction-survey/satisfaction-survey-cs.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CarotSaverFoodCategoryCsModule,
        CarotSaverMealCsModule,
        CarotSaverMenuCsModule,
        CarotSaverWasteMetricCsModule,
        CarotSaverDishCsModule,
        CarotSaverMealRateCsModule,
        CarotSaverSatisfactionSurveyCsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverEntityModule {}
