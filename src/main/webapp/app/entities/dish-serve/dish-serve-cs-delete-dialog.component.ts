import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DishServeCs } from './dish-serve-cs.model';
import { DishServeCsPopupService } from './dish-serve-cs-popup.service';
import { DishServeCsService } from './dish-serve-cs.service';

@Component({
    selector: 'jhi-dish-serve-cs-delete-dialog',
    templateUrl: './dish-serve-cs-delete-dialog.component.html'
})
export class DishServeCsDeleteDialogComponent {

    dishServe: DishServeCs;

    constructor(
        private dishServeService: DishServeCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dishServeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dishServeListModification',
                content: 'Deleted an dishServe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dish-serve-cs-delete-popup',
    template: ''
})
export class DishServeCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dishServePopupService: DishServeCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dishServePopupService
                .open(DishServeCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
