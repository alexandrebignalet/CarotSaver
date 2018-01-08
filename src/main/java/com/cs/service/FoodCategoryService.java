package com.cs.service;

import com.cs.domain.FoodCategory;
import java.util.List;

/**
 * Service Interface for managing FoodCategory.
 */
public interface FoodCategoryService {

    /**
     * Save a foodCategory.
     *
     * @param foodCategory the entity to save
     * @return the persisted entity
     */
    FoodCategory save(FoodCategory foodCategory);

    /**
     *  Get all the foodCategories.
     *
     *  @return the list of entities
     */
    List<FoodCategory> findAll();

    /**
     *  Get the "id" foodCategory.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    FoodCategory findOne(Long id);

    /**
     *  Delete the "id" foodCategory.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
