package com.cs.repository;

import com.cs.domain.SatisfactionSurvey;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SatisfactionSurvey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SatisfactionSurveyRepository extends JpaRepository<SatisfactionSurvey, Long> {

}
