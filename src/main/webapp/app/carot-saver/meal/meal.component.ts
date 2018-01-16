import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import {MenuCs} from "../../entities/menu/menu-cs.model";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper, Account, LoginModalService } from '../../shared';
import {Router} from '@angular/router';
import {MealCsService} from "../../entities/meal/meal-cs.service";
import {MenuEditComponent} from "../menu/menu-edit/menu-edit.component";
import {MenuCsService} from "../../entities/menu/menu-cs.service";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'meal-component',
    templateUrl: './meal.component.html',
    styleUrls: [
        'meal.scss'
    ]

})
export class MealComponent implements OnInit, OnDestroy {
    meals: any;
    meal: any;
    currentAccount: any;
    selectedDate: any;
    eventSubscriber: Subscription;

    constructor(
        private mealService: MealCsService,
        private menuService: MenuCsService,
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
        this.initSelectedDate();
        this.meal = {
            menu: {},
            nbPresent: 0,
            wasteMetric: {
                plastic: 0,
                green: 0,
                other: 0
            }
        };
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMenus();



    }

    private initSelectedDate() {
        const date = new Date();
        this.selectedDate = {
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear(),
        }

        console.log(this.selectedDate);
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

    onDateChange($event) {
        let date = this.getFormattedDate();

        this.mealService.findByCreatedDate(date)

            .mergeMap( meal => {
                this.meal = meal;
                return this.menuService.find(meal.menu.id)
            })
            .subscribe(
                (menu) => {
                    this.meal.menu = menu;
                    console.log(this.meal);
                },
                (res: ResponseWrapper) => this.onError(res.json)
            )

    }



    getFormattedDate() {

        if(this.selectedDate.day) {
            let formattedDay = this.selectedDate.day.toString().length == 1 ? '0' + this.selectedDate.day : this.selectedDate.day;
            let formattedMonth = this.selectedDate.month.toString().length == 1 ? '0' + this.selectedDate.month : this.selectedDate.month;
            let date = `${this.selectedDate.year}-${formattedMonth}-${formattedDay}`;

            return date;
        }


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
