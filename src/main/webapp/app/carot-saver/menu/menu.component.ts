import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import {MenuCs} from "../../entities/menu/menu-cs.model";
import {MenuCsService} from "../../entities/menu/menu-cs.service";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper, Account, LoginModalService } from '../../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './menu.component.html',
    styleUrls: [
        'menu.scss'
    ]

})
export class MenuComponent implements OnInit, OnDestroy {
    menus: MenuCs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private menuService: MenuCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.menuService.query().subscribe(
            (res: ResponseWrapper) => {
                this.menus = res.json;
                console.log(this.menus);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMenus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MenuCs) {
        return item.id;
    }
    registerChangeInMenus() {
        this.eventSubscriber = this.eventManager.subscribe('menuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
