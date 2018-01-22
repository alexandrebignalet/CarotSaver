import './vendor.ts';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { CarotSaverSharedModule, UserRouteAccessService } from './shared';
import { CarotSaverHomeModule } from './home/home.module';
import { CarotSaverAdminModule } from './admin/admin.module';
import { CarotSaverAccountModule } from './account/account.module';
import { CarotSaverEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import {CarotSaverMainModule} from "./carot-saver/carot-saver.module";
import { SatisfactionSurveyModule } from './satisfaction-survey/satisfaction-survey.module';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        CarotSaverSharedModule,
        CarotSaverHomeModule,
        CarotSaverAdminModule,
        CarotSaverAccountModule,
        CarotSaverEntityModule,
        CarotSaverMainModule,
        SatisfactionSurveyModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
        {provide: LOCALE_ID, useValue: "fr-FR"}
    ],
    bootstrap: [ JhiMainComponent ]
})
export class CarotSaverAppModule {}
