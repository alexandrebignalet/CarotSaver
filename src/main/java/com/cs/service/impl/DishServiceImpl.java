package com.cs.service.impl;

import com.cs.service.DishService;
import com.cs.domain.Dish;
import com.cs.repository.DishRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Dish.
 */
@Service
@Transactional
public class DishServiceImpl implements DishService{

    private final Logger log = LoggerFactory.getLogger(DishServiceImpl.class);

    private final DishRepository dishRepository;

    public DishServiceImpl(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    /**
     * Save a dish.
     *
     * @param dish the entity to save
     * @return the persisted entity
     */
    @Override
    public Dish save(Dish dish) {
        log.debug("Request to save Dish : {}", dish);
        return dishRepository.save(dish);
    }

    /**
     *  Get all the dishes.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Dish> findAll() {
        log.debug("Request to get all Dishes");
        return dishRepository.findAllWithEagerRelationships();
    }

    /**
     *  Get one dish by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Dish findOne(Long id) {
        log.debug("Request to get Dish : {}", id);
        return dishRepository.findOneWithEagerRelationships(id);
    }

    /**
     *  Delete the  dish by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dish : {}", id);
        dishRepository.delete(id);
    }
}
