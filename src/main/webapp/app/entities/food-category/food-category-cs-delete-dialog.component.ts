import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FoodCategoryCs } from './food-category-cs.model';
import { FoodCategoryCsPopupService } from './food-category-cs-popup.service';
import { FoodCategoryCsService } from './food-category-cs.service';

@Component({
    selector: 'jhi-food-category-cs-delete-dialog',
    templateUrl: './food-category-cs-delete-dialog.component.html'
})
export class FoodCategoryCsDeleteDialogComponent {

    foodCategory: FoodCategoryCs;

    constructor(
        private foodCategoryService: FoodCategoryCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.foodCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'foodCategoryListModification',
                content: 'Deleted an foodCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-food-category-cs-delete-popup',
    template: ''
})
export class FoodCategoryCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private foodCategoryPopupService: FoodCategoryCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.foodCategoryPopupService
                .open(FoodCategoryCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
