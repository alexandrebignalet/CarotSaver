import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WasteMetricCs } from './waste-metric-cs.model';
import { WasteMetricCsService } from './waste-metric-cs.service';

@Component({
    selector: 'jhi-waste-metric-cs-detail',
    templateUrl: './waste-metric-cs-detail.component.html'
})
export class WasteMetricCsDetailComponent implements OnInit, OnDestroy {

    wasteMetric: WasteMetricCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private wasteMetricService: WasteMetricCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWasteMetrics();
    }

    load(id) {
        this.wasteMetricService.find(id).subscribe((wasteMetric) => {
            this.wasteMetric = wasteMetric;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWasteMetrics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'wasteMetricListModification',
            (response) => this.load(this.wasteMetric.id)
        );
    }
}
