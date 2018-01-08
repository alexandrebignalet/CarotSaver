import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CarotSaverFoodCategoryCsModule } from './food-category/food-category-cs.module';
import { CarotSaverMealCsModule } from './meal/meal-cs.module';
import { CarotSaverMenuCsModule } from './menu/menu-cs.module';
import { CarotSaverWasteMetricCsModule } from './waste-metric/waste-metric-cs.module';
import { CarotSaverDishServeCsModule } from './dish-serve/dish-serve-cs.module';
import { CarotSaverDishCsModule } from './dish/dish-cs.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CarotSaverFoodCategoryCsModule,
        CarotSaverMealCsModule,
        CarotSaverMenuCsModule,
        CarotSaverWasteMetricCsModule,
        CarotSaverDishServeCsModule,
        CarotSaverDishCsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverEntityModule {}
