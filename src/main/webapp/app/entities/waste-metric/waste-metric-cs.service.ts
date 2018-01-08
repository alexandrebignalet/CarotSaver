import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { WasteMetricCs } from './waste-metric-cs.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WasteMetricCsService {

    private resourceUrl = SERVER_API_URL + 'api/waste-metrics';

    constructor(private http: Http) { }

    create(wasteMetric: WasteMetricCs): Observable<WasteMetricCs> {
        const copy = this.convert(wasteMetric);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(wasteMetric: WasteMetricCs): Observable<WasteMetricCs> {
        const copy = this.convert(wasteMetric);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<WasteMetricCs> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to WasteMetricCs.
     */
    private convertItemFromServer(json: any): WasteMetricCs {
        const entity: WasteMetricCs = Object.assign(new WasteMetricCs(), json);
        return entity;
    }

    /**
     * Convert a WasteMetricCs to a JSON which can be sent to the server.
     */
    private convert(wasteMetric: WasteMetricCs): WasteMetricCs {
        const copy: WasteMetricCs = Object.assign({}, wasteMetric);
        return copy;
    }
}
