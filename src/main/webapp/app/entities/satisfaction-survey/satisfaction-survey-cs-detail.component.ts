import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SatisfactionSurveyCs } from './satisfaction-survey-cs.model';
import { SatisfactionSurveyCsService } from './satisfaction-survey-cs.service';

@Component({
    selector: 'jhi-satisfaction-survey-cs-detail',
    templateUrl: './satisfaction-survey-cs-detail.component.html'
})
export class SatisfactionSurveyCsDetailComponent implements OnInit, OnDestroy {

    satisfactionSurvey: SatisfactionSurveyCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private satisfactionSurveyService: SatisfactionSurveyCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSatisfactionSurveys();
    }

    load(id) {
        this.satisfactionSurveyService.find(id).subscribe((satisfactionSurvey) => {
            this.satisfactionSurvey = satisfactionSurvey;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSatisfactionSurveys() {
        this.eventSubscriber = this.eventManager.subscribe(
            'satisfactionSurveyListModification',
            (response) => this.load(this.satisfactionSurvey.id)
        );
    }
}
