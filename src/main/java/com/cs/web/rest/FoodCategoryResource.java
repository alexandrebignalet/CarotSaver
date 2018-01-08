package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.FoodCategory;
import com.cs.service.FoodCategoryService;
import com.cs.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FoodCategory.
 */
@RestController
@RequestMapping("/api")
public class FoodCategoryResource {

    private final Logger log = LoggerFactory.getLogger(FoodCategoryResource.class);

    private static final String ENTITY_NAME = "foodCategory";

    private final FoodCategoryService foodCategoryService;

    public FoodCategoryResource(FoodCategoryService foodCategoryService) {
        this.foodCategoryService = foodCategoryService;
    }

    /**
     * POST  /food-categories : Create a new foodCategory.
     *
     * @param foodCategory the foodCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new foodCategory, or with status 400 (Bad Request) if the foodCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/food-categories")
    @Timed
    public ResponseEntity<FoodCategory> createFoodCategory(@RequestBody FoodCategory foodCategory) throws URISyntaxException {
        log.debug("REST request to save FoodCategory : {}", foodCategory);
        if (foodCategory.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new foodCategory cannot already have an ID")).body(null);
        }
        FoodCategory result = foodCategoryService.save(foodCategory);
        return ResponseEntity.created(new URI("/api/food-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /food-categories : Updates an existing foodCategory.
     *
     * @param foodCategory the foodCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated foodCategory,
     * or with status 400 (Bad Request) if the foodCategory is not valid,
     * or with status 500 (Internal Server Error) if the foodCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/food-categories")
    @Timed
    public ResponseEntity<FoodCategory> updateFoodCategory(@RequestBody FoodCategory foodCategory) throws URISyntaxException {
        log.debug("REST request to update FoodCategory : {}", foodCategory);
        if (foodCategory.getId() == null) {
            return createFoodCategory(foodCategory);
        }
        FoodCategory result = foodCategoryService.save(foodCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, foodCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /food-categories : get all the foodCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of foodCategories in body
     */
    @GetMapping("/food-categories")
    @Timed
    public List<FoodCategory> getAllFoodCategories() {
        log.debug("REST request to get all FoodCategories");
        return foodCategoryService.findAll();
        }

    /**
     * GET  /food-categories/:id : get the "id" foodCategory.
     *
     * @param id the id of the foodCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the foodCategory, or with status 404 (Not Found)
     */
    @GetMapping("/food-categories/{id}")
    @Timed
    public ResponseEntity<FoodCategory> getFoodCategory(@PathVariable Long id) {
        log.debug("REST request to get FoodCategory : {}", id);
        FoodCategory foodCategory = foodCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(foodCategory));
    }

    /**
     * DELETE  /food-categories/:id : delete the "id" foodCategory.
     *
     * @param id the id of the foodCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/food-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteFoodCategory(@PathVariable Long id) {
        log.debug("REST request to delete FoodCategory : {}", id);
        foodCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
