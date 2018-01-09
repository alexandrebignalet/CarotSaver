package com.cs.service.impl;

import com.cs.service.MealService;
import com.cs.domain.Meal;
import com.cs.repository.MealRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Service Implementation for managing Meal.
 */
@Service
@Transactional
public class MealServiceImpl implements MealService {

    private final Logger log = LoggerFactory.getLogger(MealServiceImpl.class);

    private final MealRepository mealRepository;

    public MealServiceImpl(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    /**
     * Save a meal.
     *
     * @param meal the entity to save
     * @return the persisted entity
     */
    @Override
    public Meal save(Meal meal) {
        log.debug("Request to save Meal : {}", meal);
        return mealRepository.save(meal);
    }

    /**
     *  Get all the meals.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Meal> findAll() {
        log.debug("Request to get all Meals");
        return mealRepository.findAll();
    }

    /**
     *  Get all the meals between dates.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Meal> findByCreatedDateBetween(Instant startDate, Instant endDate) {
        return this.mealRepository.findMealsByCreatedDateBetween(startDate, endDate);
    }

    /**
     *  Get one meal by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Meal findOne(Long id) {
        log.debug("Request to get Meal : {}", id);
        return mealRepository.findOne(id);
    }

    /**
     *  Delete the  meal by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Meal : {}", id);
        mealRepository.delete(id);
    }
}
