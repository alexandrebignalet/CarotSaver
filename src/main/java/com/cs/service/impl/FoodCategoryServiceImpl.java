package com.cs.service.impl;

import com.cs.service.FoodCategoryService;
import com.cs.domain.FoodCategory;
import com.cs.repository.FoodCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing FoodCategory.
 */
@Service
@Transactional
public class FoodCategoryServiceImpl implements FoodCategoryService{

    private final Logger log = LoggerFactory.getLogger(FoodCategoryServiceImpl.class);

    private final FoodCategoryRepository foodCategoryRepository;

    public FoodCategoryServiceImpl(FoodCategoryRepository foodCategoryRepository) {
        this.foodCategoryRepository = foodCategoryRepository;
    }

    /**
     * Save a foodCategory.
     *
     * @param foodCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public FoodCategory save(FoodCategory foodCategory) {
        log.debug("Request to save FoodCategory : {}", foodCategory);
        return foodCategoryRepository.save(foodCategory);
    }

    /**
     *  Get all the foodCategories.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FoodCategory> findAll() {
        log.debug("Request to get all FoodCategories");
        return foodCategoryRepository.findAll();
    }

    /**
     *  Get one foodCategory by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FoodCategory findOne(Long id) {
        log.debug("Request to get FoodCategory : {}", id);
        return foodCategoryRepository.findOne(id);
    }

    /**
     *  Delete the  foodCategory by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FoodCategory : {}", id);
        foodCategoryRepository.delete(id);
    }
}
