import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MealCs } from './meal-cs.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MealCsService {

    private resourceUrl = SERVER_API_URL + 'api/meals';

    constructor(private http: Http) { }

    create(meal: MealCs): Observable<MealCs> {
        const copy = this.convert(meal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(meal: MealCs): Observable<MealCs> {
        const copy = this.convert(meal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MealCs> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    fetchMetrics(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/waste-metrics`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    fetchTopWaster(type: boolean, limit: number) : Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/top-ten-waster?more=${type? 'true' : 'false'}&limit=${limit}`).map((res: Response) => this.convertResponse(res));
    }

    /**
     *
     * @param startDate yyyy-MM-dd
     * @param endDate yyyy-MM-dd
     * @returns Observable<ResponseWrapper>
     */
    findByCreatedDateBetWeen(startDate, endDate): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/${startDate}/${endDate}`)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to MealCs.
     */
    private convertItemFromServer(json: any): MealCs {
        const entity: MealCs = Object.assign(new MealCs(), json);
        return entity;
    }

    /**
     * Convert a MealCs to a JSON which can be sent to the server.
     */
    private convert(meal: MealCs): MealCs {
        const copy: MealCs = Object.assign({}, meal);
        return copy;
    }
}
