package com.cs.service;

import com.cs.domain.Dish;
import java.util.List;

/**
 * Service Interface for managing Dish.
 */
public interface DishService {

    /**
     * Save a dish.
     *
     * @param dish the entity to save
     * @return the persisted entity
     */
    Dish save(Dish dish);

    /**
     *  Get all the dishes.
     *
     *  @return the list of entities
     */
    List<Dish> findAll();

    /**
     *  Get the "id" dish.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Dish findOne(Long id);

    /**
     *  Delete the "id" dish.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
