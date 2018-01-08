package com.cs.web.rest;

import com.cs.CarotSaverApp;

import com.cs.domain.Dish;
import com.cs.repository.DishRepository;
import com.cs.service.DishService;
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

import com.cs.domain.enumeration.MealType;
/**
 * Test class for the DishResource REST controller.
 *
 * @see DishResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CarotSaverApp.class)
public class DishResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final MealType DEFAULT_TYPE = MealType.ENTREE;
    private static final MealType UPDATED_TYPE = MealType.PRINCIPAL;

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private DishService dishService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDishMockMvc;

    private Dish dish;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DishResource dishResource = new DishResource(dishService);
        this.restDishMockMvc = MockMvcBuilders.standaloneSetup(dishResource)
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
    public static Dish createEntity(EntityManager em) {
        Dish dish = new Dish()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE);
        return dish;
    }

    @Before
    public void initTest() {
        dish = createEntity(em);
    }

    @Test
    @Transactional
    public void createDish() throws Exception {
        int databaseSizeBeforeCreate = dishRepository.findAll().size();

        // Create the Dish
        restDishMockMvc.perform(post("/api/dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dish)))
            .andExpect(status().isCreated());

        // Validate the Dish in the database
        List<Dish> dishList = dishRepository.findAll();
        assertThat(dishList).hasSize(databaseSizeBeforeCreate + 1);
        Dish testDish = dishList.get(dishList.size() - 1);
        assertThat(testDish.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDish.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createDishWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dishRepository.findAll().size();

        // Create the Dish with an existing ID
        dish.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDishMockMvc.perform(post("/api/dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dish)))
            .andExpect(status().isBadRequest());

        // Validate the Dish in the database
        List<Dish> dishList = dishRepository.findAll();
        assertThat(dishList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDishes() throws Exception {
        // Initialize the database
        dishRepository.saveAndFlush(dish);

        // Get all the dishList
        restDishMockMvc.perform(get("/api/dishes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dish.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getDish() throws Exception {
        // Initialize the database
        dishRepository.saveAndFlush(dish);

        // Get the dish
        restDishMockMvc.perform(get("/api/dishes/{id}", dish.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dish.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDish() throws Exception {
        // Get the dish
        restDishMockMvc.perform(get("/api/dishes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDish() throws Exception {
        // Initialize the database
        dishService.save(dish);

        int databaseSizeBeforeUpdate = dishRepository.findAll().size();

        // Update the dish
        Dish updatedDish = dishRepository.findOne(dish.getId());
        updatedDish
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE);

        restDishMockMvc.perform(put("/api/dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDish)))
            .andExpect(status().isOk());

        // Validate the Dish in the database
        List<Dish> dishList = dishRepository.findAll();
        assertThat(dishList).hasSize(databaseSizeBeforeUpdate);
        Dish testDish = dishList.get(dishList.size() - 1);
        assertThat(testDish.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDish.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDish() throws Exception {
        int databaseSizeBeforeUpdate = dishRepository.findAll().size();

        // Create the Dish

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDishMockMvc.perform(put("/api/dishes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dish)))
            .andExpect(status().isCreated());

        // Validate the Dish in the database
        List<Dish> dishList = dishRepository.findAll();
        assertThat(dishList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDish() throws Exception {
        // Initialize the database
        dishService.save(dish);

        int databaseSizeBeforeDelete = dishRepository.findAll().size();

        // Get the dish
        restDishMockMvc.perform(delete("/api/dishes/{id}", dish.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dish> dishList = dishRepository.findAll();
        assertThat(dishList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dish.class);
        Dish dish1 = new Dish();
        dish1.setId(1L);
        Dish dish2 = new Dish();
        dish2.setId(dish1.getId());
        assertThat(dish1).isEqualTo(dish2);
        dish2.setId(2L);
        assertThat(dish1).isNotEqualTo(dish2);
        dish1.setId(null);
        assertThat(dish1).isNotEqualTo(dish2);
    }
}
