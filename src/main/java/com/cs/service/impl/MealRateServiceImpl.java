package com.cs.service.impl;

import com.cs.service.MealRateService;
import com.cs.domain.MealRate;
import com.cs.repository.MealRateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing MealRate.
 */
@Service
@Transactional
public class MealRateServiceImpl implements MealRateService{

    private final Logger log = LoggerFactory.getLogger(MealRateServiceImpl.class);

    private final MealRateRepository mealRateRepository;

    public MealRateServiceImpl(MealRateRepository mealRateRepository) {
        this.mealRateRepository = mealRateRepository;
    }

    /**
     * Save a mealRate.
     *
     * @param mealRate the entity to save
     * @return the persisted entity
     */
    @Override
    public MealRate save(MealRate mealRate) {
        log.debug("Request to save MealRate : {}", mealRate);
        return mealRateRepository.save(mealRate);
    }

    /**
     *  Get all the mealRates.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealRate> findAll() {
        log.debug("Request to get all MealRates");
        return mealRateRepository.findAll();
    }

    /**
     *  Get one mealRate by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MealRate findOne(Long id) {
        log.debug("Request to get MealRate : {}", id);
        return mealRateRepository.findOne(id);
    }

    /**
     *  Delete the  mealRate by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealRate : {}", id);
        mealRateRepository.delete(id);
    }
}
