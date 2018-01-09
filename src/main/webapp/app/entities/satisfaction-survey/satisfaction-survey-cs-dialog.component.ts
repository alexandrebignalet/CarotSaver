import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SatisfactionSurveyCs } from './satisfaction-survey-cs.model';
import { SatisfactionSurveyCsPopupService } from './satisfaction-survey-cs-popup.service';
import { SatisfactionSurveyCsService } from './satisfaction-survey-cs.service';
import { MealRateCs, MealRateCsService } from '../meal-rate';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-satisfaction-survey-cs-dialog',
    templateUrl: './satisfaction-survey-cs-dialog.component.html'
})
export class SatisfactionSurveyCsDialogComponent implements OnInit {

    satisfactionSurvey: SatisfactionSurveyCs;
    isSaving: boolean;

    qualityrates: MealRateCs[];

    quantityrates: MealRateCs[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private satisfactionSurveyService: SatisfactionSurveyCsService,
        private mealRateService: MealRateCsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mealRateService
            .query({filter: 'satisfactionsurvey-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.satisfactionSurvey.qualityRate || !this.satisfactionSurvey.qualityRate.id) {
                    this.qualityrates = res.json;
                } else {
                    this.mealRateService
                        .find(this.satisfactionSurvey.qualityRate.id)
                        .subscribe((subRes: MealRateCs) => {
                            this.qualityrates = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.mealRateService
            .query({filter: 'satisfactionsurvey-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.satisfactionSurvey.quantityRate || !this.satisfactionSurvey.quantityRate.id) {
                    this.quantityrates = res.json;
                } else {
                    this.mealRateService
                        .find(this.satisfactionSurvey.quantityRate.id)
                        .subscribe((subRes: MealRateCs) => {
                            this.quantityrates = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.satisfactionSurvey.id !== undefined) {
            this.subscribeToSaveResponse(
                this.satisfactionSurveyService.update(this.satisfactionSurvey));
        } else {
            this.subscribeToSaveResponse(
                this.satisfactionSurveyService.create(this.satisfactionSurvey));
        }
    }

    private subscribeToSaveResponse(result: Observable<SatisfactionSurveyCs>) {
        result.subscribe((res: SatisfactionSurveyCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SatisfactionSurveyCs) {
        this.eventManager.broadcast({ name: 'satisfactionSurveyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMealRateById(index: number, item: MealRateCs) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-satisfaction-survey-cs-popup',
    template: ''
})
export class SatisfactionSurveyCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private satisfactionSurveyPopupService: SatisfactionSurveyCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.satisfactionSurveyPopupService
                    .open(SatisfactionSurveyCsDialogComponent as Component, params['id']);
            } else {
                this.satisfactionSurveyPopupService
                    .open(SatisfactionSurveyCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
