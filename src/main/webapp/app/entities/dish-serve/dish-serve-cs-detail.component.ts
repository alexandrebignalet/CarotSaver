import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DishServeCs } from './dish-serve-cs.model';
import { DishServeCsService } from './dish-serve-cs.service';

@Component({
    selector: 'jhi-dish-serve-cs-detail',
    templateUrl: './dish-serve-cs-detail.component.html'
})
export class DishServeCsDetailComponent implements OnInit, OnDestroy {

    dishServe: DishServeCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dishServeService: DishServeCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDishServes();
    }

    load(id) {
        this.dishServeService.find(id).subscribe((dishServe) => {
            this.dishServe = dishServe;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDishServes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dishServeListModification',
            (response) => this.load(this.dishServe.id)
        );
    }
}
