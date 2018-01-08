package com.cs.repository;

import com.cs.domain.Menu;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
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

}
