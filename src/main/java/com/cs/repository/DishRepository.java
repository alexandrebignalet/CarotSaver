package com.cs.repository;

import com.cs.domain.Dish;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Dish entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
    @Query("select distinct dish from Dish dish left join fetch dish.foodCategories")
    List<Dish> findAllWithEagerRelationships();

    @Query("select dish from Dish dish left join fetch dish.foodCategories where dish.id =:id")
    Dish findOneWithEagerRelationships(@Param("id") Long id);

}
