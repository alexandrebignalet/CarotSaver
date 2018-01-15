package com.cs.service.impl;

import com.cs.service.MenuService;
import com.cs.domain.Menu;
import com.cs.repository.MenuRepository;
import com.cs.repository.projection.MenuCounterPerFoodCategory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Service Implementation for managing Menu.
 */
@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    private final Logger log = LoggerFactory.getLogger(MenuServiceImpl.class);

    private final MenuRepository menuRepository;

    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    /**
     * Save a menu.
     *
     * @param menu the entity to save
     * @return the persisted entity
     */
    @Override
    public Menu save(Menu menu) {
        log.debug("Request to save Menu : {}", menu);
        return menuRepository.save(menu);
    }


    public List<MenuCounterPerFoodCategory> findMenuRepartitionByFoodCategory(Instant startDate, Instant endDate) {
        log.debug("Request find category repartition by Menu");
        return menuRepository.findByCreatedDateBetween(startDate, endDate);
    }
    /**
     *  Get all the menus.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Menu> findAll() {
        log.debug("Request to get all Menus");
        return menuRepository.findAllWithEagerRelationships();
    }

    /**
     *  Get one menu by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Menu findOne(Long id) {
        log.debug("Request to get Menu : {}", id);
        return menuRepository.findOneWithEagerRelationships(id);
    }

    /**
     *  Delete the  menu by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Menu : {}", id);
        menuRepository.delete(id);
    }
}
