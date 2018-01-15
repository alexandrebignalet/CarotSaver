package com.cs.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.cs.domain.FoodCategory;
import com.cs.domain.*; // for static metamodels
import com.cs.repository.FoodCategoryRepository;
import com.cs.service.dto.FoodCategoryCriteria;


/**
 * Service for executing complex queries for FoodCategory entities in the database.
 * The main input is a {@link FoodCategoryCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link FoodCategory} or a {@link Page} of {%link FoodCategory} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class FoodCategoryQueryService extends QueryService<FoodCategory> {

    private final Logger log = LoggerFactory.getLogger(FoodCategoryQueryService.class);


    private final FoodCategoryRepository foodCategoryRepository;

    public FoodCategoryQueryService(FoodCategoryRepository foodCategoryRepository) {
        this.foodCategoryRepository = foodCategoryRepository;
    }

    /**
     * Return a {@link List} of {%link FoodCategory} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<FoodCategory> findByCriteria(FoodCategoryCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<FoodCategory> specification = createSpecification(criteria);
        return foodCategoryRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link FoodCategory} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<FoodCategory> findByCriteria(FoodCategoryCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<FoodCategory> specification = createSpecification(criteria);
        return foodCategoryRepository.findAll(specification, page);
    }

    /**
     * Function to convert FoodCategoryCriteria to a {@link Specifications}
     */
    private Specifications<FoodCategory> createSpecification(FoodCategoryCriteria criteria) {
        Specifications<FoodCategory> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), FoodCategory_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), FoodCategory_.name));
            }
        }
        return specification;
    }

}
