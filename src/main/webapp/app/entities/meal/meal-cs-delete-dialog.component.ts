import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MealCs } from './meal-cs.model';
import { MealCsPopupService } from './meal-cs-popup.service';
import { MealCsService } from './meal-cs.service';

@Component({
    selector: 'jhi-meal-cs-delete-dialog',
    templateUrl: './meal-cs-delete-dialog.component.html'
})
export class MealCsDeleteDialogComponent {

    meal: MealCs;

    constructor(
        private mealService: MealCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mealListModification',
                content: 'Deleted an meal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-cs-delete-popup',
    template: ''
})
export class MealCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mealPopupService: MealCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mealPopupService
                .open(MealCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
