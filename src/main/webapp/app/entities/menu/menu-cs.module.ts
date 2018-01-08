import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarotSaverSharedModule } from '../../shared';
import {
    MenuCsService,
    MenuCsPopupService,
    MenuCsComponent,
    MenuCsDetailComponent,
    MenuCsDialogComponent,
    MenuCsPopupComponent,
    MenuCsDeletePopupComponent,
    MenuCsDeleteDialogComponent,
    menuRoute,
    menuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...menuRoute,
    ...menuPopupRoute,
];

@NgModule({
    imports: [
        CarotSaverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MenuCsComponent,
        MenuCsDetailComponent,
        MenuCsDialogComponent,
        MenuCsDeleteDialogComponent,
        MenuCsPopupComponent,
        MenuCsDeletePopupComponent,
    ],
    entryComponents: [
        MenuCsComponent,
        MenuCsDialogComponent,
        MenuCsPopupComponent,
        MenuCsDeleteDialogComponent,
        MenuCsDeletePopupComponent,
    ],
    providers: [
        MenuCsService,
        MenuCsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarotSaverMenuCsModule {}
