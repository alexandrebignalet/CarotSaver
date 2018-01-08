import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { DishServeCs } from './dish-serve-cs.model';
import { DishServeCsService } from './dish-serve-cs.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-dish-serve-cs',
    templateUrl: './dish-serve-cs.component.html'
})
export class DishServeCsComponent implements OnInit, OnDestroy {
dishServes: DishServeCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dishServeService: DishServeCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dishServeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dishServes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDishServes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DishServeCs) {
        return item.id;
    }
    registerChangeInDishServes() {
        this.eventSubscriber = this.eventManager.subscribe('dishServeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
