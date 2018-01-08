/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MealCsDetailComponent } from '../../../../../../main/webapp/app/entities/meal/meal-cs-detail.component';
import { MealCsService } from '../../../../../../main/webapp/app/entities/meal/meal-cs.service';
import { MealCs } from '../../../../../../main/webapp/app/entities/meal/meal-cs.model';

describe('Component Tests', () => {

    describe('MealCs Management Detail Component', () => {
        let comp: MealCsDetailComponent;
        let fixture: ComponentFixture<MealCsDetailComponent>;
        let service: MealCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [MealCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MealCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(MealCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MealCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MealCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.meal).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
