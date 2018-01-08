import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FoodCategoryCs } from './food-category-cs.model';
import { FoodCategoryCsPopupService } from './food-category-cs-popup.service';
import { FoodCategoryCsService } from './food-category-cs.service';

@Component({
    selector: 'jhi-food-category-cs-dialog',
    templateUrl: './food-category-cs-dialog.component.html'
})
export class FoodCategoryCsDialogComponent implements OnInit {

    foodCategory: FoodCategoryCs;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private foodCategoryService: FoodCategoryCsService,
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
        if (this.foodCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.foodCategoryService.update(this.foodCategory));
        } else {
            this.subscribeToSaveResponse(
                this.foodCategoryService.create(this.foodCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<FoodCategoryCs>) {
        result.subscribe((res: FoodCategoryCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FoodCategoryCs) {
        this.eventManager.broadcast({ name: 'foodCategoryListModification', content: 'OK'});
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
    selector: 'jhi-food-category-cs-popup',
    template: ''
})
export class FoodCategoryCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private foodCategoryPopupService: FoodCategoryCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.foodCategoryPopupService
                    .open(FoodCategoryCsDialogComponent as Component, params['id']);
            } else {
                this.foodCategoryPopupService
                    .open(FoodCategoryCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
