import { BaseEntity } from './../../shared';

export class SatisfactionSurveyCs implements BaseEntity {
    constructor(
        public id?: number,
        public studentName?: string,
        public qualityRate?: BaseEntity,
        public quantityRate?: BaseEntity,
    ) {
    }
}
