import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MealRateCs } from './meal-rate-cs.model';
import { MealRateCsService } from './meal-rate-cs.service';

@Component({
    selector: 'jhi-meal-rate-cs-detail',
    templateUrl: './meal-rate-cs-detail.component.html'
})
export class MealRateCsDetailComponent implements OnInit, OnDestroy {

    mealRate: MealRateCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mealRateService: MealRateCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMealRates();
    }

    load(id) {
        this.mealRateService.find(id).subscribe((mealRate) => {
            this.mealRate = mealRate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMealRates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mealRateListModification',
            (response) => this.load(this.mealRate.id)
        );
    }
}
