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
    Meal findMealByCreatedDate(Instant date);

    @Query(value="SELECT meal.*, sum(waste.plastic+waste.green+waste.other)/count(meal.id) as sum_w "+
        "from MEAL as meal " +
        "left join MENU as menu on menu.id = meal.menu_id " +
        "left join WASTE_METRIC as waste on waste.id = meal.waste_metric_id " +
        "group by meal.id, menu.id " +
        "order by sum_w ASC limit ?1 ", nativeQuery = true)
    List<Meal> findTopLessWaster(int limit);

    @Query(value="SELECT meal.*, sum(waste.plastic+waste.green+waste.other)/count(meal.id) as sum_w "+
        "from MEAL as meal " +
        "left join MENU as menu on menu.id = meal.menu_id " +
        "left join WASTE_METRIC as waste on waste.id = meal.waste_metric_id " +
        "group by meal.id, menu.id " +
        "order by sum_w DESC limit ?1 ", nativeQuery = true)
    List<Meal> findTopMoreWaster(int limit);
}
