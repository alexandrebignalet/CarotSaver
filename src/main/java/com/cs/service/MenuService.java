package com.cs.service;

import com.cs.domain.Menu;
import com.cs.repository.projection.MenuCounterPerFoodCategory;

import java.time.Instant;
import java.util.List;

/**
 * Service Interface for managing Menu.
 */
public interface MenuService {

    /**
     * Save a menu.
     *
     * @param menu the entity to save
     * @return the persisted entity
     */
    Menu save(Menu menu);

    List<MenuCounterPerFoodCategory> findMenuRepartitionByFoodCategory(Instant startDate, Instant endDate);

    /**
     *  Get all the menus.
     *
     *  @return the list of entities
     */
    List<Menu> findAll();

    /**
     *  Get the "id" menu.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Menu findOne(Long id);

    /**
     *  Delete the "id" menu.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
