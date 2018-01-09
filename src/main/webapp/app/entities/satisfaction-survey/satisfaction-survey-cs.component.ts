import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { SatisfactionSurveyCs } from './satisfaction-survey-cs.model';
import { SatisfactionSurveyCsService } from './satisfaction-survey-cs.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-satisfaction-survey-cs',
    templateUrl: './satisfaction-survey-cs.component.html'
})
export class SatisfactionSurveyCsComponent implements OnInit, OnDestroy {
satisfactionSurveys: SatisfactionSurveyCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private satisfactionSurveyService: SatisfactionSurveyCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.satisfactionSurveyService.query().subscribe(
            (res: ResponseWrapper) => {
                this.satisfactionSurveys = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSatisfactionSurveys();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SatisfactionSurveyCs) {
        return item.id;
    }
    registerChangeInSatisfactionSurveys() {
        this.eventSubscriber = this.eventManager.subscribe('satisfactionSurveyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
