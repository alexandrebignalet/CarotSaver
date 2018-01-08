import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { FoodCategoryCs } from './food-category-cs.model';
import { FoodCategoryCsService } from './food-category-cs.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-food-category-cs',
    templateUrl: './food-category-cs.component.html'
})
export class FoodCategoryCsComponent implements OnInit, OnDestroy {
foodCategories: FoodCategoryCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private foodCategoryService: FoodCategoryCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.foodCategoryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.foodCategories = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFoodCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FoodCategoryCs) {
        return item.id;
    }
    registerChangeInFoodCategories() {
        this.eventSubscriber = this.eventManager.subscribe('foodCategoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
