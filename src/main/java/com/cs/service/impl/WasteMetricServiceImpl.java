package com.cs.service.impl;

import com.cs.service.WasteMetricService;
import com.cs.domain.WasteMetric;
import com.cs.repository.WasteMetricRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing WasteMetric.
 */
@Service
@Transactional
public class WasteMetricServiceImpl implements WasteMetricService{

    private final Logger log = LoggerFactory.getLogger(WasteMetricServiceImpl.class);

    private final WasteMetricRepository wasteMetricRepository;

    public WasteMetricServiceImpl(WasteMetricRepository wasteMetricRepository) {
        this.wasteMetricRepository = wasteMetricRepository;
    }

    /**
     * Save a wasteMetric.
     *
     * @param wasteMetric the entity to save
     * @return the persisted entity
     */
    @Override
    public WasteMetric save(WasteMetric wasteMetric) {
        log.debug("Request to save WasteMetric : {}", wasteMetric);
        return wasteMetricRepository.save(wasteMetric);
    }

    /**
     *  Get all the wasteMetrics.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<WasteMetric> findAll() {
        log.debug("Request to get all WasteMetrics");
        return wasteMetricRepository.findAll();
    }

    /**
     *  Get one wasteMetric by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public WasteMetric findOne(Long id) {
        log.debug("Request to get WasteMetric : {}", id);
        return wasteMetricRepository.findOne(id);
    }

    /**
     *  Delete the  wasteMetric by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WasteMetric : {}", id);
        wasteMetricRepository.delete(id);
    }
}
