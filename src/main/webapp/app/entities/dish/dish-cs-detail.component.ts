import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DishCs } from './dish-cs.model';
import { DishCsService } from './dish-cs.service';

@Component({
    selector: 'jhi-dish-cs-detail',
    templateUrl: './dish-cs-detail.component.html'
})
export class DishCsDetailComponent implements OnInit, OnDestroy {

    dish: DishCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dishService: DishCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDishes();
    }

    load(id) {
        this.dishService.find(id).subscribe((dish) => {
            this.dish = dish;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDishes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dishListModification',
            (response) => this.load(this.dish.id)
        );
    }
}
