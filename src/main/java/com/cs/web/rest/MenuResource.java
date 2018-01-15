package com.cs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cs.domain.Menu;
import com.cs.repository.projection.MenuCounterPerFoodCategory;
import com.cs.service.MenuService;
import com.cs.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Menu.
 */
@RestController
@RequestMapping("/api")
public class MenuResource {

    private final Logger log = LoggerFactory.getLogger(MenuResource.class);

    private static final String ENTITY_NAME = "menu";

    private final MenuService menuService;

    public MenuResource(MenuService menuService) {
        this.menuService = menuService;
    }

    /**
     * POST  /menus : Create a new menu.
     *
     * @param menu the menu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new menu, or with status 400 (Bad Request) if the menu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/menus")
    @Timed
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) throws URISyntaxException {
        log.debug("REST request to save Menu : {}", menu);
        if (menu.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new menu cannot already have an ID")).body(null);
        }
        Menu result = menuService.save(menu);
        return ResponseEntity.created(new URI("/api/menus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /menus : Updates an existing menu.
     *
     * @param menu the menu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated menu,
     * or with status 400 (Bad Request) if the menu is not valid,
     * or with status 500 (Internal Server Error) if the menu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/menus")
    @Timed
    public ResponseEntity<Menu> updateMenu(@RequestBody Menu menu) throws URISyntaxException {
        log.debug("REST request to update Menu : {}", menu);
        if (menu.getId() == null) {
            return createMenu(menu);
        }
        Menu result = menuService.save(menu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, menu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /menus : get all the menus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of menus in body
     */
    @GetMapping("/menus")
    @Timed
    public List<Menu> getAllMenus() {
        log.debug("REST request to get all Menus");
        return menuService.findAll();
        }

    /**
     * GET  /menus/:id : get the "id" menu.
     *
     * @param id the id of the menu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the menu, or with status 404 (Not Found)
     */
    @GetMapping("/menus/{id}")
    @Timed
    public ResponseEntity<Menu> getMenu(@PathVariable Long id) {
        log.debug("REST request to get Menu : {}", id);
        Menu menu = menuService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(menu));
    }

    /**
     * GET  /menus/counter-by-food-categories : get a List of MenuCounterByFoodCategory.
     *
     * @param startDate of the search
     * @param endDate of the search
     * @return the ResponseEntity with status 200 (OK) and with body the menu, or with status 404 (Not Found)
     */
    @GetMapping("/menus/counter-by-food-categories/{startDate}/{endDate}")
    @Timed
    public List<MenuCounterPerFoodCategory> getAllMenuCounterPerFoodCategory(
        @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        log.debug("REST request to getAll MenuCounterByFoodCategory between " + startDate.toString() + " and "+endDate.toString());
        return menuService.findMenuRepartitionByFoodCategory(startDate.toInstant(), endDate.toInstant());
    }

    /**
     * DELETE  /menus/:id : delete the "id" menu.
     *
     * @param id the id of the menu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/menus/{id}")
    @Timed
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        log.debug("REST request to delete Menu : {}", id);
        menuService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
