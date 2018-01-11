import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import {MenuCs} from "../../entities/menu/menu-cs.model";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper, Account, LoginModalService } from '../../shared';
import {Router} from '@angular/router';
import {MealCsService} from "../../entities/meal/meal-cs.service";

@Component({
    selector: 'jhi-home',
    templateUrl: './meal.component.html',
    styleUrls: [
        'meal.scss'
    ]

})
export class MealComponent implements OnInit, OnDestroy {
    meals: any;
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mealService: MealCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {
    }

    loadAll() {
        this.mealService.query().subscribe(
            (res: ResponseWrapper) => {

                this.parseData(res.json);
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

    goToEdit() {
        this.router.navigate(['/carot-saver-meal-edit'])
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private parseData(data) {
        this.meals = data;
        for(let meal of data) {
           /* for(let item of meal.menu.dishes) {
                item.entree = item.dishes.filter(dish => dish.type == "ENTREE")[0];
                item.principal = item.dishes.filter(dish => dish.type == "PRINCIPAL")[0];
                item.dessert = item.dishes.filter(dish => dish.type == "DESSERT")[0];
            }*/
        }

        this.meals = data;
        console.log(data);
    }


}
