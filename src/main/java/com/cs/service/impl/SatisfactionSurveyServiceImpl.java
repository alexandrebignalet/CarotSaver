package com.cs.service.impl;

import com.cs.service.SatisfactionSurveyService;
import com.cs.domain.SatisfactionSurvey;
import com.cs.repository.SatisfactionSurveyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing SatisfactionSurvey.
 */
@Service
@Transactional
public class SatisfactionSurveyServiceImpl implements SatisfactionSurveyService{

    private final Logger log = LoggerFactory.getLogger(SatisfactionSurveyServiceImpl.class);

    private final SatisfactionSurveyRepository satisfactionSurveyRepository;

    public SatisfactionSurveyServiceImpl(SatisfactionSurveyRepository satisfactionSurveyRepository) {
        this.satisfactionSurveyRepository = satisfactionSurveyRepository;
    }

    /**
     * Save a satisfactionSurvey.
     *
     * @param satisfactionSurvey the entity to save
     * @return the persisted entity
     */
    @Override
    public SatisfactionSurvey save(SatisfactionSurvey satisfactionSurvey) {
        log.debug("Request to save SatisfactionSurvey : {}", satisfactionSurvey);
        return satisfactionSurveyRepository.save(satisfactionSurvey);
    }

    /**
     *  Get all the satisfactionSurveys.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SatisfactionSurvey> findAll() {
        log.debug("Request to get all SatisfactionSurveys");
        return satisfactionSurveyRepository.findAll();
    }

    /**
     *  Get one satisfactionSurvey by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SatisfactionSurvey findOne(Long id) {
        log.debug("Request to get SatisfactionSurvey : {}", id);
        return satisfactionSurveyRepository.findOne(id);
    }

    /**
     *  Delete the  satisfactionSurvey by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SatisfactionSurvey : {}", id);
        satisfactionSurveyRepository.delete(id);
    }
}
