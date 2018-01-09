import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { MealRateCs } from './meal-rate-cs.model';
import { MealRateCsService } from './meal-rate-cs.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-meal-rate-cs',
    templateUrl: './meal-rate-cs.component.html'
})
export class MealRateCsComponent implements OnInit, OnDestroy {
mealRates: MealRateCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mealRateService: MealRateCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mealRateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mealRates = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMealRates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MealRateCs) {
        return item.id;
    }
    registerChangeInMealRates() {
        this.eventSubscriber = this.eventManager.subscribe('mealRateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
