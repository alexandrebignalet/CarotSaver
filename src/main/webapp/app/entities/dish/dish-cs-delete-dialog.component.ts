import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DishCs } from './dish-cs.model';
import { DishCsPopupService } from './dish-cs-popup.service';
import { DishCsService } from './dish-cs.service';

@Component({
    selector: 'jhi-dish-cs-delete-dialog',
    templateUrl: './dish-cs-delete-dialog.component.html'
})
export class DishCsDeleteDialogComponent {

    dish: DishCs;

    constructor(
        private dishService: DishCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dishService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dishListModification',
                content: 'Deleted an dish'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dish-cs-delete-popup',
    template: ''
})
export class DishCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dishPopupService: DishCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dishPopupService
                .open(DishCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
