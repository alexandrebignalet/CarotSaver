/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { WasteMetricCsDetailComponent } from '../../../../../../main/webapp/app/entities/waste-metric/waste-metric-cs-detail.component';
import { WasteMetricCsService } from '../../../../../../main/webapp/app/entities/waste-metric/waste-metric-cs.service';
import { WasteMetricCs } from '../../../../../../main/webapp/app/entities/waste-metric/waste-metric-cs.model';

describe('Component Tests', () => {

    describe('WasteMetricCs Management Detail Component', () => {
        let comp: WasteMetricCsDetailComponent;
        let fixture: ComponentFixture<WasteMetricCsDetailComponent>;
        let service: WasteMetricCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [WasteMetricCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    WasteMetricCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(WasteMetricCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WasteMetricCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WasteMetricCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new WasteMetricCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.wasteMetric).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
