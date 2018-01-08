package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.DishServe;
import com.cs.service.DishServeService;
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
 * REST controller for managing DishServe.
 */
@RestController
@RequestMapping("/api")
public class DishServeResource {

    private final Logger log = LoggerFactory.getLogger(DishServeResource.class);

    private static final String ENTITY_NAME = "dishServe";

    private final DishServeService dishServeService;

    public DishServeResource(DishServeService dishServeService) {
        this.dishServeService = dishServeService;
    }

    /**
     * POST  /dish-serves : Create a new dishServe.
     *
     * @param dishServe the dishServe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dishServe, or with status 400 (Bad Request) if the dishServe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dish-serves")
    @Timed
    public ResponseEntity<DishServe> createDishServe(@RequestBody DishServe dishServe) throws URISyntaxException {
        log.debug("REST request to save DishServe : {}", dishServe);
        if (dishServe.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new dishServe cannot already have an ID")).body(null);
        }
        DishServe result = dishServeService.save(dishServe);
        return ResponseEntity.created(new URI("/api/dish-serves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dish-serves : Updates an existing dishServe.
     *
     * @param dishServe the dishServe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dishServe,
     * or with status 400 (Bad Request) if the dishServe is not valid,
     * or with status 500 (Internal Server Error) if the dishServe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dish-serves")
    @Timed
    public ResponseEntity<DishServe> updateDishServe(@RequestBody DishServe dishServe) throws URISyntaxException {
        log.debug("REST request to update DishServe : {}", dishServe);
        if (dishServe.getId() == null) {
            return createDishServe(dishServe);
        }
        DishServe result = dishServeService.save(dishServe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dishServe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dish-serves : get all the dishServes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dishServes in body
     */
    @GetMapping("/dish-serves")
    @Timed
    public List<DishServe> getAllDishServes() {
        log.debug("REST request to get all DishServes");
        return dishServeService.findAll();
        }

    /**
     * GET  /dish-serves/:id : get the "id" dishServe.
     *
     * @param id the id of the dishServe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dishServe, or with status 404 (Not Found)
     */
    @GetMapping("/dish-serves/{id}")
    @Timed
    public ResponseEntity<DishServe> getDishServe(@PathVariable Long id) {
        log.debug("REST request to get DishServe : {}", id);
        DishServe dishServe = dishServeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dishServe));
    }

    /**
     * DELETE  /dish-serves/:id : delete the "id" dishServe.
     *
     * @param id the id of the dishServe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dish-serves/{id}")
    @Timed
    public ResponseEntity<Void> deleteDishServe(@PathVariable Long id) {
        log.debug("REST request to delete DishServe : {}", id);
        dishServeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
