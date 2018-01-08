import './vendor.ts';
import { NgModule } from '@angular/core';
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
        CarotSaverMainModule
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
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class CarotSaverAppModule {}
