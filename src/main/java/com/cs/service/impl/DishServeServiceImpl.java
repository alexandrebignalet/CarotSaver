package com.cs.service.impl;

import com.cs.service.DishServeService;
import com.cs.domain.DishServe;
import com.cs.repository.DishServeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing DishServe.
 */
@Service
@Transactional
public class DishServeServiceImpl implements DishServeService{

    private final Logger log = LoggerFactory.getLogger(DishServeServiceImpl.class);

    private final DishServeRepository dishServeRepository;

    public DishServeServiceImpl(DishServeRepository dishServeRepository) {
        this.dishServeRepository = dishServeRepository;
    }

    /**
     * Save a dishServe.
     *
     * @param dishServe the entity to save
     * @return the persisted entity
     */
    @Override
    public DishServe save(DishServe dishServe) {
        log.debug("Request to save DishServe : {}", dishServe);
        return dishServeRepository.save(dishServe);
    }

    /**
     *  Get all the dishServes.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DishServe> findAll() {
        log.debug("Request to get all DishServes");
        return dishServeRepository.findAll();
    }

    /**
     *  Get one dishServe by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DishServe findOne(Long id) {
        log.debug("Request to get DishServe : {}", id);
        return dishServeRepository.findOne(id);
    }

    /**
     *  Delete the  dishServe by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DishServe : {}", id);
        dishServeRepository.delete(id);
    }
}
