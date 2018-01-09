package com.cs.service;

import com.cs.domain.MealRate;
import java.util.List;

/**
 * Service Interface for managing MealRate.
 */
public interface MealRateService {

    /**
     * Save a mealRate.
     *
     * @param mealRate the entity to save
     * @return the persisted entity
     */
    MealRate save(MealRate mealRate);

    /**
     *  Get all the mealRates.
     *
     *  @return the list of entities
     */
    List<MealRate> findAll();

    /**
     *  Get the "id" mealRate.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MealRate findOne(Long id);

    /**
     *  Delete the "id" mealRate.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
