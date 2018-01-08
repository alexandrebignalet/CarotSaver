package com.cs.service;

import com.cs.domain.DishServe;
import java.util.List;

/**
 * Service Interface for managing DishServe.
 */
public interface DishServeService {

    /**
     * Save a dishServe.
     *
     * @param dishServe the entity to save
     * @return the persisted entity
     */
    DishServe save(DishServe dishServe);

    /**
     *  Get all the dishServes.
     *
     *  @return the list of entities
     */
    List<DishServe> findAll();

    /**
     *  Get the "id" dishServe.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    DishServe findOne(Long id);

    /**
     *  Delete the "id" dishServe.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
