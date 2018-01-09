package com.cs.repository;

import com.cs.domain.Meal;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the Meal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findMealsByCreatedDateBetween(Instant startDate, Instant endDate);
}
