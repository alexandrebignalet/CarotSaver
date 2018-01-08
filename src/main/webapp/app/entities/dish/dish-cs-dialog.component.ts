import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DishCs } from './dish-cs.model';
import { DishCsPopupService } from './dish-cs-popup.service';
import { DishCsService } from './dish-cs.service';
import { FoodCategoryCs, FoodCategoryCsService } from '../food-category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dish-cs-dialog',
    templateUrl: './dish-cs-dialog.component.html'
})
export class DishCsDialogComponent implements OnInit {

    dish: DishCs;
    isSaving: boolean;

    foodcategories: FoodCategoryCs[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dishService: DishCsService,
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
        if (this.dish.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dishService.update(this.dish));
        } else {
            this.subscribeToSaveResponse(
                this.dishService.create(this.dish));
        }
    }

    private subscribeToSaveResponse(result: Observable<DishCs>) {
        result.subscribe((res: DishCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DishCs) {
        this.eventManager.broadcast({ name: 'dishListModification', content: 'OK'});
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
    selector: 'jhi-dish-cs-popup',
    template: ''
})
export class DishCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dishPopupService: DishCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dishPopupService
                    .open(DishCsDialogComponent as Component, params['id']);
            } else {
                this.dishPopupService
                    .open(DishCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
