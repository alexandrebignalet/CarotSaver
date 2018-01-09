package com.cs.repository;

import com.cs.domain.MealRate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MealRate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealRateRepository extends JpaRepository<MealRate, Long> {

}
