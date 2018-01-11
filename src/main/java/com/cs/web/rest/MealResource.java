package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.Meal;
import com.cs.service.MealService;
import com.cs.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.net.URI;
import java.net.URISyntaxException;


import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Meal.
 */
@RestController
@RequestMapping("/api")
public class MealResource {

    private final Logger log = LoggerFactory.getLogger(MealResource.class);

    private static final String ENTITY_NAME = "meal";

    private final MealService mealService;

    public MealResource(MealService mealService) {
        this.mealService = mealService;
    }

    /**
     * POST  /meals : Create a new meal.
     *
     * @param meal the meal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meal, or with status 400 (Bad Request) if the meal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meals")
    @Timed
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) throws URISyntaxException {
        log.debug("REST request to save Meal : {}", meal);
        if (meal.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new meal cannot already have an ID")).body(null);
        }
        Meal result = mealService.save(meal);
        return ResponseEntity.created(new URI("/api/meals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meals : Updates an existing meal.
     *
     * @param meal the meal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meal,
     * or with status 400 (Bad Request) if the meal is not valid,
     * or with status 500 (Internal Server Error) if the meal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meals")
    @Timed
    public ResponseEntity<Meal> updateMeal(@RequestBody Meal meal) throws URISyntaxException {
        log.debug("REST request to update Meal : {}", meal);
        if (meal.getId() == null) {
            return createMeal(meal);
        }
        Meal result = mealService.save(meal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meals : get all the meals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meals in body
     */
    @GetMapping("/meals")
    @Timed
    public List<Meal> getAllMeals() {
        log.debug("REST request to get all Meals");
        return mealService.findAll();
    }

    /**
     * GET  /meals/{startDate}/{endDate} : get all the meals between dates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meals in body
     */
    @GetMapping("/meals/{startDate}/{endDate}")
    @Timed
    public List<Meal> getAllMeals(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                  @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        log.debug("REST request to get all Meals between dates");

        return mealService.findByCreatedDateBetween(startDate.toInstant(), endDate.toInstant());
    }

    /**
     * GET  /meals?date={date} : get the meal of a given date.
     *
     * @return the ResponseEntity with status 200 (OK) and the meal in body
     */
    @GetMapping("/meals/date/{date}")
    @Timed
    public ResponseEntity<Meal> getMealByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        log.debug("REST request to get the Meal of a given date");

        ZonedDateTime startOfDay = ZonedDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault()).toLocalDate().atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime tomorrowStartOfDay = startOfDay.plusDays(1);

        List<Meal> meals = mealService.findByCreatedDateBetween(startOfDay.toInstant(), tomorrowStartOfDay.toInstant());
        Meal meal = meals.isEmpty() ?  null : meals.get(0);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(meal));
    }

    /**
     * GET  /meals/:id : get the "id" meal.
     *
     * @param id the id of the meal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meal, or with status 404 (Not Found)
     */
    @GetMapping("/meals/{id}")
    @Timed
    public ResponseEntity<Meal> getMeal(@PathVariable Long id) {
        log.debug("REST request to get Meal : {}", id);
        Meal meal = mealService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(meal));
    }

    /**
     * DELETE  /meals/:id : delete the "id" meal.
     *
     * @param id the id of the meal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meals/{id}")
    @Timed
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        log.debug("REST request to delete Meal : {}", id);
        mealService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
