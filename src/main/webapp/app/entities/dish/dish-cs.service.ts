import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DishCs } from './dish-cs.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DishCsService {

    private resourceUrl = SERVER_API_URL + 'api/dishes';

    constructor(private http: Http) { }

    create(dish: DishCs): Observable<DishCs> {
        const copy = this.convert(dish);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dish: DishCs): Observable<DishCs> {
        const copy = this.convert(dish);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DishCs> {
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
     * Convert a returned JSON object to DishCs.
     */
    private convertItemFromServer(json: any): DishCs {
        const entity: DishCs = Object.assign(new DishCs(), json);
        return entity;
    }

    /**
     * Convert a DishCs to a JSON which can be sent to the server.
     */
    private convert(dish: DishCs): DishCs {
        const copy: DishCs = Object.assign({}, dish);
        return copy;
    }
}
