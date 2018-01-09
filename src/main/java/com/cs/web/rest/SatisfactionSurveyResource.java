package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.SatisfactionSurvey;
import com.cs.service.SatisfactionSurveyService;
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
 * REST controller for managing SatisfactionSurvey.
 */
@RestController
@RequestMapping("/api")
public class SatisfactionSurveyResource {

    private final Logger log = LoggerFactory.getLogger(SatisfactionSurveyResource.class);

    private static final String ENTITY_NAME = "satisfactionSurvey";

    private final SatisfactionSurveyService satisfactionSurveyService;

    public SatisfactionSurveyResource(SatisfactionSurveyService satisfactionSurveyService) {
        this.satisfactionSurveyService = satisfactionSurveyService;
    }

    /**
     * POST  /satisfaction-surveys : Create a new satisfactionSurvey.
     *
     * @param satisfactionSurvey the satisfactionSurvey to create
     * @return the ResponseEntity with status 201 (Created) and with body the new satisfactionSurvey, or with status 400 (Bad Request) if the satisfactionSurvey has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/satisfaction-surveys")
    @Timed
    public ResponseEntity<SatisfactionSurvey> createSatisfactionSurvey(@RequestBody SatisfactionSurvey satisfactionSurvey) throws URISyntaxException {
        log.debug("REST request to save SatisfactionSurvey : {}", satisfactionSurvey);
        if (satisfactionSurvey.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new satisfactionSurvey cannot already have an ID")).body(null);
        }
        SatisfactionSurvey result = satisfactionSurveyService.save(satisfactionSurvey);
        return ResponseEntity.created(new URI("/api/satisfaction-surveys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /satisfaction-surveys : Updates an existing satisfactionSurvey.
     *
     * @param satisfactionSurvey the satisfactionSurvey to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated satisfactionSurvey,
     * or with status 400 (Bad Request) if the satisfactionSurvey is not valid,
     * or with status 500 (Internal Server Error) if the satisfactionSurvey couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/satisfaction-surveys")
    @Timed
    public ResponseEntity<SatisfactionSurvey> updateSatisfactionSurvey(@RequestBody SatisfactionSurvey satisfactionSurvey) throws URISyntaxException {
        log.debug("REST request to update SatisfactionSurvey : {}", satisfactionSurvey);
        if (satisfactionSurvey.getId() == null) {
            return createSatisfactionSurvey(satisfactionSurvey);
        }
        SatisfactionSurvey result = satisfactionSurveyService.save(satisfactionSurvey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, satisfactionSurvey.getId().toString()))
            .body(result);
    }

    /**
     * GET  /satisfaction-surveys : get all the satisfactionSurveys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of satisfactionSurveys in body
     */
    @GetMapping("/satisfaction-surveys")
    @Timed
    public List<SatisfactionSurvey> getAllSatisfactionSurveys() {
        log.debug("REST request to get all SatisfactionSurveys");
        return satisfactionSurveyService.findAll();
        }

    /**
     * GET  /satisfaction-surveys/:id : get the "id" satisfactionSurvey.
     *
     * @param id the id of the satisfactionSurvey to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the satisfactionSurvey, or with status 404 (Not Found)
     */
    @GetMapping("/satisfaction-surveys/{id}")
    @Timed
    public ResponseEntity<SatisfactionSurvey> getSatisfactionSurvey(@PathVariable Long id) {
        log.debug("REST request to get SatisfactionSurvey : {}", id);
        SatisfactionSurvey satisfactionSurvey = satisfactionSurveyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(satisfactionSurvey));
    }

    /**
     * DELETE  /satisfaction-surveys/:id : delete the "id" satisfactionSurvey.
     *
     * @param id the id of the satisfactionSurvey to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/satisfaction-surveys/{id}")
    @Timed
    public ResponseEntity<Void> deleteSatisfactionSurvey(@PathVariable Long id) {
        log.debug("REST request to delete SatisfactionSurvey : {}", id);
        satisfactionSurveyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
