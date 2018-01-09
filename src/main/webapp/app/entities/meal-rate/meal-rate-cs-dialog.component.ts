import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MealRateCs } from './meal-rate-cs.model';
import { MealRateCsPopupService } from './meal-rate-cs-popup.service';
import { MealRateCsService } from './meal-rate-cs.service';

@Component({
    selector: 'jhi-meal-rate-cs-dialog',
    templateUrl: './meal-rate-cs-dialog.component.html'
})
export class MealRateCsDialogComponent implements OnInit {

    mealRate: MealRateCs;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mealRateService: MealRateCsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mealRate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mealRateService.update(this.mealRate));
        } else {
            this.subscribeToSaveResponse(
                this.mealRateService.create(this.mealRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<MealRateCs>) {
        result.subscribe((res: MealRateCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MealRateCs) {
        this.eventManager.broadcast({ name: 'mealRateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-meal-rate-cs-popup',
    template: ''
})
export class MealRateCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mealRatePopupService: MealRateCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mealRatePopupService
                    .open(MealRateCsDialogComponent as Component, params['id']);
            } else {
                this.mealRatePopupService
                    .open(MealRateCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
