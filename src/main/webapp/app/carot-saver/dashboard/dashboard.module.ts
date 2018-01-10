import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { WasteEvolutionBetWeenDatesComponent } from './waste-evolution-between-dates.component';

@NgModule({
    imports: [
        ChartsModule
    ],
    declarations: [
        WasteEvolutionBetWeenDatesComponent
    ],
    entryComponents: [
    ],
    exports: [
        WasteEvolutionBetWeenDatesComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
