package com.cs.service;

import com.cs.domain.SatisfactionSurvey;
import java.util.List;

/**
 * Service Interface for managing SatisfactionSurvey.
 */
public interface SatisfactionSurveyService {

    /**
     * Save a satisfactionSurvey.
     *
     * @param satisfactionSurvey the entity to save
     * @return the persisted entity
     */
    SatisfactionSurvey save(SatisfactionSurvey satisfactionSurvey);

    /**
     *  Get all the satisfactionSurveys.
     *
     *  @return the list of entities
     */
    List<SatisfactionSurvey> findAll();

    /**
     *  Get the "id" satisfactionSurvey.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SatisfactionSurvey findOne(Long id);

    /**
     *  Delete the "id" satisfactionSurvey.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
