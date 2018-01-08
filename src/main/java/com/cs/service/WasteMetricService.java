package com.cs.service;

import com.cs.domain.WasteMetric;
import java.util.List;

/**
 * Service Interface for managing WasteMetric.
 */
public interface WasteMetricService {

    /**
     * Save a wasteMetric.
     *
     * @param wasteMetric the entity to save
     * @return the persisted entity
     */
    WasteMetric save(WasteMetric wasteMetric);

    /**
     *  Get all the wasteMetrics.
     *
     *  @return the list of entities
     */
    List<WasteMetric> findAll();

    /**
     *  Get the "id" wasteMetric.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    WasteMetric findOne(Long id);

    /**
     *  Delete the "id" wasteMetric.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
