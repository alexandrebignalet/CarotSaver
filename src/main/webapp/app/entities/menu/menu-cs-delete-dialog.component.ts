import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MenuCs } from './menu-cs.model';
import { MenuCsPopupService } from './menu-cs-popup.service';
import { MenuCsService } from './menu-cs.service';

@Component({
    selector: 'jhi-menu-cs-delete-dialog',
    templateUrl: './menu-cs-delete-dialog.component.html'
})
export class MenuCsDeleteDialogComponent {

    menu: MenuCs;

    constructor(
        private menuService: MenuCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.menuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'menuListModification',
                content: 'Deleted an menu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-cs-delete-popup',
    template: ''
})
export class MenuCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPopupService: MenuCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.menuPopupService
                .open(MenuCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
