import { BaseEntity } from './../../shared';

export class WasteMetricCs implements BaseEntity {
    constructor(
        public id?: number,
        public plastic?: number,
        public green?: number,
        public other?: number,
    ) {
    }
}
