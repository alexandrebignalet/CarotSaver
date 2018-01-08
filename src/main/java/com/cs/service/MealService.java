package com.cs.service;

import com.cs.domain.Meal;
import java.util.List;

/**
 * Service Interface for managing Meal.
 */
public interface MealService {

    /**
     * Save a meal.
     *
     * @param meal the entity to save
     * @return the persisted entity
     */
    Meal save(Meal meal);

    /**
     *  Get all the meals.
     *
     *  @return the list of entities
     */
    List<Meal> findAll();

    /**
     *  Get the "id" meal.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Meal findOne(Long id);

    /**
     *  Delete the "id" meal.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
