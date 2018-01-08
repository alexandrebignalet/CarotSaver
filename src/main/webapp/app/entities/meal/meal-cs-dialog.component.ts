import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MealCs } from './meal-cs.model';
import { MealCsPopupService } from './meal-cs-popup.service';
import { MealCsService } from './meal-cs.service';
import { FoodCategoryCs, FoodCategoryCsService } from '../food-category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-meal-cs-dialog',
    templateUrl: './meal-cs-dialog.component.html'
})
export class MealCsDialogComponent implements OnInit {

    meal: MealCs;
    isSaving: boolean;

    foodcategories: FoodCategoryCs[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mealService: MealCsService,
        private foodCategoryService: FoodCategoryCsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.foodCategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.foodcategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.meal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mealService.update(this.meal));
        } else {
            this.subscribeToSaveResponse(
                this.mealService.create(this.meal));
        }
    }

    private subscribeToSaveResponse(result: Observable<MealCs>) {
        result.subscribe((res: MealCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MealCs) {
        this.eventManager.broadcast({ name: 'mealListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFoodCategoryById(index: number, item: FoodCategoryCs) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-meal-cs-popup',
    template: ''
})
export class MealCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mealPopupService: MealCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mealPopupService
                    .open(MealCsDialogComponent as Component, params['id']);
            } else {
                this.mealPopupService
                    .open(MealCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
