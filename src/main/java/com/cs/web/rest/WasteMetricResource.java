package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.WasteMetric;
import com.cs.service.WasteMetricService;
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
 * REST controller for managing WasteMetric.
 */
@RestController
@RequestMapping("/api")
public class WasteMetricResource {

    private final Logger log = LoggerFactory.getLogger(WasteMetricResource.class);

    private static final String ENTITY_NAME = "wasteMetric";

    private final WasteMetricService wasteMetricService;

    public WasteMetricResource(WasteMetricService wasteMetricService) {
        this.wasteMetricService = wasteMetricService;
    }

    /**
     * POST  /waste-metrics : Create a new wasteMetric.
     *
     * @param wasteMetric the wasteMetric to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wasteMetric, or with status 400 (Bad Request) if the wasteMetric has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/waste-metrics")
    @Timed
    public ResponseEntity<WasteMetric> createWasteMetric(@RequestBody WasteMetric wasteMetric) throws URISyntaxException {
        log.debug("REST request to save WasteMetric : {}", wasteMetric);
        if (wasteMetric.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new wasteMetric cannot already have an ID")).body(null);
        }
        WasteMetric result = wasteMetricService.save(wasteMetric);
        return ResponseEntity.created(new URI("/api/waste-metrics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /waste-metrics : Updates an existing wasteMetric.
     *
     * @param wasteMetric the wasteMetric to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wasteMetric,
     * or with status 400 (Bad Request) if the wasteMetric is not valid,
     * or with status 500 (Internal Server Error) if the wasteMetric couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/waste-metrics")
    @Timed
    public ResponseEntity<WasteMetric> updateWasteMetric(@RequestBody WasteMetric wasteMetric) throws URISyntaxException {
        log.debug("REST request to update WasteMetric : {}", wasteMetric);
        if (wasteMetric.getId() == null) {
            return createWasteMetric(wasteMetric);
        }
        WasteMetric result = wasteMetricService.save(wasteMetric);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wasteMetric.getId().toString()))
            .body(result);
    }

    /**
     * GET  /waste-metrics : get all the wasteMetrics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wasteMetrics in body
     */
    @GetMapping("/waste-metrics")
    @Timed
    public List<WasteMetric> getAllWasteMetrics() {
        log.debug("REST request to get all WasteMetrics");
        return wasteMetricService.findAll();
        }

    /**
     * GET  /waste-metrics/:id : get the "id" wasteMetric.
     *
     * @param id the id of the wasteMetric to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wasteMetric, or with status 404 (Not Found)
     */
    @GetMapping("/waste-metrics/{id}")
    @Timed
    public ResponseEntity<WasteMetric> getWasteMetric(@PathVariable Long id) {
        log.debug("REST request to get WasteMetric : {}", id);
        WasteMetric wasteMetric = wasteMetricService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wasteMetric));
    }

    /**
     * DELETE  /waste-metrics/:id : delete the "id" wasteMetric.
     *
     * @param id the id of the wasteMetric to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/waste-metrics/{id}")
    @Timed
    public ResponseEntity<Void> deleteWasteMetric(@PathVariable Long id) {
        log.debug("REST request to delete WasteMetric : {}", id);
        wasteMetricService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
