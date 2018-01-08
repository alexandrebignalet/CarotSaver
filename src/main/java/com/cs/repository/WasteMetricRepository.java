package com.cs.repository;

import com.cs.domain.WasteMetric;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WasteMetric entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WasteMetricRepository extends JpaRepository<WasteMetric, Long> {

}
