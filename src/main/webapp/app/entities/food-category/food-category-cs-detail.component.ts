import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FoodCategoryCs } from './food-category-cs.model';
import { FoodCategoryCsService } from './food-category-cs.service';

@Component({
    selector: 'jhi-food-category-cs-detail',
    templateUrl: './food-category-cs-detail.component.html'
})
export class FoodCategoryCsDetailComponent implements OnInit, OnDestroy {

    foodCategory: FoodCategoryCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private foodCategoryService: FoodCategoryCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFoodCategories();
    }

    load(id) {
        this.foodCategoryService.find(id).subscribe((foodCategory) => {
            this.foodCategory = foodCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFoodCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'foodCategoryListModification',
            (response) => this.load(this.foodCategory.id)
        );
    }
}
