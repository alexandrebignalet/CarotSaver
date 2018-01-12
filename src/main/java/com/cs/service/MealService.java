package com.cs.service;

import com.cs.domain.Meal;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
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
     * Check if a Meal can be created
     * Only one Meal can be persisted by day
     *
     * @return boolean
     */
    Boolean canBeCreated();
    /**
     * Get the Meal of a given day
     *
     * @param date of the day
     * @return the persisted entity
     */
    Meal getMealOfTheDay(Date date);
    /**
     *  Get all the meals.
     *
     *  @return the list of entities
     */
    List<Meal> findAll();

    /**
     *  Get all the meals between dates.
     *
     *  @return the list of entities
     */
    List<Meal> findByCreatedDateBetween(Instant startDate, Instant endDate);

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
