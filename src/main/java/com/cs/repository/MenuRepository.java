package com.cs.repository;

import com.cs.domain.Menu;
import com.cs.repository.projection.MenuCounterPerFoodCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

/**
 * Spring Data JPA repository for the Menu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query("select distinct menu from Menu menu left join fetch menu.dishes")
    List<Menu> findAllWithEagerRelationships();

    @Query("select menu from Menu menu left join fetch menu.dishes where menu.id =:id")
    Menu findOneWithEagerRelationships(@Param("id") Long id);

    @Query(value = "select fc.name as foodCategoryName, count(menu.id) as menuCounter from Menu menu " +
        "left join MENU_DISHES as md on md.menus_id = menu.id " +
        "left join DISH as dish on dish.id = md.dishes_id " +
        "left join DISH_FOOD_CATEGORIES as dfc on dish.id = dfc.dishes_id " +
        "left join FOOD_CATEGORY as fc on fc.id = dfc.food_categories_id " +
        "where dish.id is not null and fc.id is not null " +
        "and menu.created_date >= ?1 " +
        "and menu.created_date <= ?2 " +
        "group by fc.name", nativeQuery = true)
    List<MenuCounterPerFoodCategory> findByCreatedDateBetween(Instant startDate, Instant endDate);
}
