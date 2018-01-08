import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { DishCs } from './dish-cs.model';
import { DishCsService } from './dish-cs.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-dish-cs',
    templateUrl: './dish-cs.component.html'
})
export class DishCsComponent implements OnInit, OnDestroy {
dishes: DishCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dishService: DishCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dishService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dishes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDishes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DishCs) {
        return item.id;
    }
    registerChangeInDishes() {
        this.eventSubscriber = this.eventManager.subscribe('dishListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
