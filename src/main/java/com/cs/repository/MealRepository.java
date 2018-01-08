package com.cs.repository;

import com.cs.domain.Meal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Meal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    @Query("select distinct meal from Meal meal left join fetch meal.foodCategories")
    List<Meal> findAllWithEagerRelationships();

    @Query("select meal from Meal meal left join fetch meal.foodCategories where meal.id =:id")
    Meal findOneWithEagerRelationships(@Param("id") Long id);

}
