package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.MealRate;
import com.cs.service.MealRateService;
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
 * REST controller for managing MealRate.
 */
@RestController
@RequestMapping("/api")
public class MealRateResource {

    private final Logger log = LoggerFactory.getLogger(MealRateResource.class);

    private static final String ENTITY_NAME = "mealRate";

    private final MealRateService mealRateService;

    public MealRateResource(MealRateService mealRateService) {
        this.mealRateService = mealRateService;
    }

    /**
     * POST  /meal-rates : Create a new mealRate.
     *
     * @param mealRate the mealRate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealRate, or with status 400 (Bad Request) if the mealRate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-rates")
    @Timed
    public ResponseEntity<MealRate> createMealRate(@RequestBody MealRate mealRate) throws URISyntaxException {
        log.debug("REST request to save MealRate : {}", mealRate);
        if (mealRate.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mealRate cannot already have an ID")).body(null);
        }
        MealRate result = mealRateService.save(mealRate);
        return ResponseEntity.created(new URI("/api/meal-rates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-rates : Updates an existing mealRate.
     *
     * @param mealRate the mealRate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealRate,
     * or with status 400 (Bad Request) if the mealRate is not valid,
     * or with status 500 (Internal Server Error) if the mealRate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-rates")
    @Timed
    public ResponseEntity<MealRate> updateMealRate(@RequestBody MealRate mealRate) throws URISyntaxException {
        log.debug("REST request to update MealRate : {}", mealRate);
        if (mealRate.getId() == null) {
            return createMealRate(mealRate);
        }
        MealRate result = mealRateService.save(mealRate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealRate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-rates : get all the mealRates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealRates in body
     */
    @GetMapping("/meal-rates")
    @Timed
    public List<MealRate> getAllMealRates() {
        log.debug("REST request to get all MealRates");
        return mealRateService.findAll();
        }

    /**
     * GET  /meal-rates/:id : get the "id" mealRate.
     *
     * @param id the id of the mealRate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealRate, or with status 404 (Not Found)
     */
    @GetMapping("/meal-rates/{id}")
    @Timed
    public ResponseEntity<MealRate> getMealRate(@PathVariable Long id) {
        log.debug("REST request to get MealRate : {}", id);
        MealRate mealRate = mealRateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mealRate));
    }

    /**
     * DELETE  /meal-rates/:id : delete the "id" mealRate.
     *
     * @param id the id of the mealRate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-rates/{id}")
    @Timed
    public ResponseEntity<Void> deleteMealRate(@PathVariable Long id) {
        log.debug("REST request to delete MealRate : {}", id);
        mealRateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
