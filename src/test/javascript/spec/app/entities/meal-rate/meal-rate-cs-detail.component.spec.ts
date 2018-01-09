/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MealRateCsDetailComponent } from '../../../../../../main/webapp/app/entities/meal-rate/meal-rate-cs-detail.component';
import { MealRateCsService } from '../../../../../../main/webapp/app/entities/meal-rate/meal-rate-cs.service';
import { MealRateCs } from '../../../../../../main/webapp/app/entities/meal-rate/meal-rate-cs.model';

describe('Component Tests', () => {

    describe('MealRateCs Management Detail Component', () => {
        let comp: MealRateCsDetailComponent;
        let fixture: ComponentFixture<MealRateCsDetailComponent>;
        let service: MealRateCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [MealRateCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MealRateCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(MealRateCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MealRateCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealRateCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MealRateCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mealRate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
