package com.cs.web.rest;

import com.cs.CarotSaverApp;

import com.cs.domain.DishServe;
import com.cs.repository.DishServeRepository;
import com.cs.service.DishServeService;
import com.cs.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DishServeResource REST controller.
 *
 * @see DishServeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CarotSaverApp.class)
public class DishServeResourceIntTest {

    private static final Integer DEFAULT_NB_PRESENT = 1;
    private static final Integer UPDATED_NB_PRESENT = 2;

    @Autowired
    private DishServeRepository dishServeRepository;

    @Autowired
    private DishServeService dishServeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDishServeMockMvc;

    private DishServe dishServe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DishServeResource dishServeResource = new DishServeResource(dishServeService);
        this.restDishServeMockMvc = MockMvcBuilders.standaloneSetup(dishServeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DishServe createEntity(EntityManager em) {
        DishServe dishServe = new DishServe()
            .nbPresent(DEFAULT_NB_PRESENT);
        return dishServe;
    }

    @Before
    public void initTest() {
        dishServe = createEntity(em);
    }

    @Test
    @Transactional
    public void createDishServe() throws Exception {
        int databaseSizeBeforeCreate = dishServeRepository.findAll().size();

        // Create the DishServe
        restDishServeMockMvc.perform(post("/api/dish-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishServe)))
            .andExpect(status().isCreated());

        // Validate the DishServe in the database
        List<DishServe> dishServeList = dishServeRepository.findAll();
        assertThat(dishServeList).hasSize(databaseSizeBeforeCreate + 1);
        DishServe testDishServe = dishServeList.get(dishServeList.size() - 1);
        assertThat(testDishServe.getNbPresent()).isEqualTo(DEFAULT_NB_PRESENT);
    }

    @Test
    @Transactional
    public void createDishServeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dishServeRepository.findAll().size();

        // Create the DishServe with an existing ID
        dishServe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDishServeMockMvc.perform(post("/api/dish-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishServe)))
            .andExpect(status().isBadRequest());

        // Validate the DishServe in the database
        List<DishServe> dishServeList = dishServeRepository.findAll();
        assertThat(dishServeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDishServes() throws Exception {
        // Initialize the database
        dishServeRepository.saveAndFlush(dishServe);

        // Get all the dishServeList
        restDishServeMockMvc.perform(get("/api/dish-serves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dishServe.getId().intValue())))
            .andExpect(jsonPath("$.[*].nbPresent").value(hasItem(DEFAULT_NB_PRESENT)));
    }

    @Test
    @Transactional
    public void getDishServe() throws Exception {
        // Initialize the database
        dishServeRepository.saveAndFlush(dishServe);

        // Get the dishServe
        restDishServeMockMvc.perform(get("/api/dish-serves/{id}", dishServe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dishServe.getId().intValue()))
            .andExpect(jsonPath("$.nbPresent").value(DEFAULT_NB_PRESENT));
    }

    @Test
    @Transactional
    public void getNonExistingDishServe() throws Exception {
        // Get the dishServe
        restDishServeMockMvc.perform(get("/api/dish-serves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDishServe() throws Exception {
        // Initialize the database
        dishServeService.save(dishServe);

        int databaseSizeBeforeUpdate = dishServeRepository.findAll().size();

        // Update the dishServe
        DishServe updatedDishServe = dishServeRepository.findOne(dishServe.getId());
        updatedDishServe
            .nbPresent(UPDATED_NB_PRESENT);

        restDishServeMockMvc.perform(put("/api/dish-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDishServe)))
            .andExpect(status().isOk());

        // Validate the DishServe in the database
        List<DishServe> dishServeList = dishServeRepository.findAll();
        assertThat(dishServeList).hasSize(databaseSizeBeforeUpdate);
        DishServe testDishServe = dishServeList.get(dishServeList.size() - 1);
        assertThat(testDishServe.getNbPresent()).isEqualTo(UPDATED_NB_PRESENT);
    }

    @Test
    @Transactional
    public void updateNonExistingDishServe() throws Exception {
        int databaseSizeBeforeUpdate = dishServeRepository.findAll().size();

        // Create the DishServe

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDishServeMockMvc.perform(put("/api/dish-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dishServe)))
            .andExpect(status().isCreated());

        // Validate the DishServe in the database
        List<DishServe> dishServeList = dishServeRepository.findAll();
        assertThat(dishServeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDishServe() throws Exception {
        // Initialize the database
        dishServeService.save(dishServe);

        int databaseSizeBeforeDelete = dishServeRepository.findAll().size();

        // Get the dishServe
        restDishServeMockMvc.perform(delete("/api/dish-serves/{id}", dishServe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DishServe> dishServeList = dishServeRepository.findAll();
        assertThat(dishServeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DishServe.class);
        DishServe dishServe1 = new DishServe();
        dishServe1.setId(1L);
        DishServe dishServe2 = new DishServe();
        dishServe2.setId(dishServe1.getId());
        assertThat(dishServe1).isEqualTo(dishServe2);
        dishServe2.setId(2L);
        assertThat(dishServe1).isNotEqualTo(dishServe2);
        dishServe1.setId(null);
        assertThat(dishServe1).isNotEqualTo(dishServe2);
    }
}
