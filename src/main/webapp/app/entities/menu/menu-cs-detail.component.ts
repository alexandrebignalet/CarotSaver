import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MenuCs } from './menu-cs.model';
import { MenuCsService } from './menu-cs.service';

@Component({
    selector: 'jhi-menu-cs-detail',
    templateUrl: './menu-cs-detail.component.html'
})
export class MenuCsDetailComponent implements OnInit, OnDestroy {

    menu: MenuCs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private menuService: MenuCsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMenus();
    }

    load(id) {
        this.menuService.find(id).subscribe((menu) => {
            this.menu = menu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMenus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'menuListModification',
            (response) => this.load(this.menu.id)
        );
    }
}
