import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MealRateCs } from './meal-rate-cs.model';
import { MealRateCsPopupService } from './meal-rate-cs-popup.service';
import { MealRateCsService } from './meal-rate-cs.service';

@Component({
    selector: 'jhi-meal-rate-cs-delete-dialog',
    templateUrl: './meal-rate-cs-delete-dialog.component.html'
})
export class MealRateCsDeleteDialogComponent {

    mealRate: MealRateCs;

    constructor(
        private mealRateService: MealRateCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealRateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mealRateListModification',
                content: 'Deleted an mealRate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-rate-cs-delete-popup',
    template: ''
})
export class MealRateCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mealRatePopupService: MealRateCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mealRatePopupService
                .open(MealRateCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
