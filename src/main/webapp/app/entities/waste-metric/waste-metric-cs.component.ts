import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { WasteMetricCs } from './waste-metric-cs.model';
import { WasteMetricCsService } from './waste-metric-cs.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-waste-metric-cs',
    templateUrl: './waste-metric-cs.component.html'
})
export class WasteMetricCsComponent implements OnInit, OnDestroy {
wasteMetrics: WasteMetricCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wasteMetricService: WasteMetricCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.wasteMetricService.query().subscribe(
            (res: ResponseWrapper) => {
                this.wasteMetrics = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWasteMetrics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WasteMetricCs) {
        return item.id;
    }
    registerChangeInWasteMetrics() {
        this.eventSubscriber = this.eventManager.subscribe('wasteMetricListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
