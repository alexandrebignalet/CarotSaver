package com.cs.web.rest;

import com.cs.CarotSaverApp;

import com.cs.domain.FoodCategory;
import com.cs.repository.FoodCategoryRepository;
import com.cs.service.FoodCategoryService;
import com.cs.web.rest.errors.ExceptionTranslator;
import com.cs.service.dto.FoodCategoryCriteria;
import com.cs.service.FoodCategoryQueryService;

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
 * Test class for the FoodCategoryResource REST controller.
 *
 * @see FoodCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CarotSaverApp.class)
public class FoodCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private FoodCategoryRepository foodCategoryRepository;

    @Autowired
    private FoodCategoryService foodCategoryService;

    @Autowired
    private FoodCategoryQueryService foodCategoryQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFoodCategoryMockMvc;

    private FoodCategory foodCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FoodCategoryResource foodCategoryResource = new FoodCategoryResource(foodCategoryService, foodCategoryQueryService);
        this.restFoodCategoryMockMvc = MockMvcBuilders.standaloneSetup(foodCategoryResource)
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
    public static FoodCategory createEntity(EntityManager em) {
        FoodCategory foodCategory = new FoodCategory()
            .name(DEFAULT_NAME);
        return foodCategory;
    }

    @Before
    public void initTest() {
        foodCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createFoodCategory() throws Exception {
        int databaseSizeBeforeCreate = foodCategoryRepository.findAll().size();

        // Create the FoodCategory
        restFoodCategoryMockMvc.perform(post("/api/food-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodCategory)))
            .andExpect(status().isCreated());

        // Validate the FoodCategory in the database
        List<FoodCategory> foodCategoryList = foodCategoryRepository.findAll();
        assertThat(foodCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        FoodCategory testFoodCategory = foodCategoryList.get(foodCategoryList.size() - 1);
        assertThat(testFoodCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createFoodCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = foodCategoryRepository.findAll().size();

        // Create the FoodCategory with an existing ID
        foodCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFoodCategoryMockMvc.perform(post("/api/food-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodCategory)))
            .andExpect(status().isBadRequest());

        // Validate the FoodCategory in the database
        List<FoodCategory> foodCategoryList = foodCategoryRepository.findAll();
        assertThat(foodCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFoodCategories() throws Exception {
        // Initialize the database
        foodCategoryRepository.saveAndFlush(foodCategory);

        // Get all the foodCategoryList
        restFoodCategoryMockMvc.perform(get("/api/food-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(foodCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getFoodCategory() throws Exception {
        // Initialize the database
        foodCategoryRepository.saveAndFlush(foodCategory);

        // Get the foodCategory
        restFoodCategoryMockMvc.perform(get("/api/food-categories/{id}", foodCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(foodCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getAllFoodCategoriesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        foodCategoryRepository.saveAndFlush(foodCategory);

        // Get all the foodCategoryList where name equals to DEFAULT_NAME
        defaultFoodCategoryShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the foodCategoryList where name equals to UPDATED_NAME
        defaultFoodCategoryShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllFoodCategoriesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        foodCategoryRepository.saveAndFlush(foodCategory);

        // Get all the foodCategoryList where name in DEFAULT_NAME or UPDATED_NAME
        defaultFoodCategoryShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the foodCategoryList where name equals to UPDATED_NAME
        defaultFoodCategoryShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllFoodCategoriesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        foodCategoryRepository.saveAndFlush(foodCategory);

        // Get all the foodCategoryList where name is not null
        defaultFoodCategoryShouldBeFound("name.specified=true");

        // Get all the foodCategoryList where name is null
        defaultFoodCategoryShouldNotBeFound("name.specified=false");
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultFoodCategoryShouldBeFound(String filter) throws Exception {
        restFoodCategoryMockMvc.perform(get("/api/food-categories?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(foodCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultFoodCategoryShouldNotBeFound(String filter) throws Exception {
        restFoodCategoryMockMvc.perform(get("/api/food-categories?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingFoodCategory() throws Exception {
        // Get the foodCategory
        restFoodCategoryMockMvc.perform(get("/api/food-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFoodCategory() throws Exception {
        // Initialize the database
        foodCategoryService.save(foodCategory);

        int databaseSizeBeforeUpdate = foodCategoryRepository.findAll().size();

        // Update the foodCategory
        FoodCategory updatedFoodCategory = foodCategoryRepository.findOne(foodCategory.getId());
        updatedFoodCategory
            .name(UPDATED_NAME);

        restFoodCategoryMockMvc.perform(put("/api/food-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFoodCategory)))
            .andExpect(status().isOk());

        // Validate the FoodCategory in the database
        List<FoodCategory> foodCategoryList = foodCategoryRepository.findAll();
        assertThat(foodCategoryList).hasSize(databaseSizeBeforeUpdate);
        FoodCategory testFoodCategory = foodCategoryList.get(foodCategoryList.size() - 1);
        assertThat(testFoodCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingFoodCategory() throws Exception {
        int databaseSizeBeforeUpdate = foodCategoryRepository.findAll().size();

        // Create the FoodCategory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFoodCategoryMockMvc.perform(put("/api/food-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foodCategory)))
            .andExpect(status().isCreated());

        // Validate the FoodCategory in the database
        List<FoodCategory> foodCategoryList = foodCategoryRepository.findAll();
        assertThat(foodCategoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFoodCategory() throws Exception {
        // Initialize the database
        foodCategoryService.save(foodCategory);

        int databaseSizeBeforeDelete = foodCategoryRepository.findAll().size();

        // Get the foodCategory
        restFoodCategoryMockMvc.perform(delete("/api/food-categories/{id}", foodCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FoodCategory> foodCategoryList = foodCategoryRepository.findAll();
        assertThat(foodCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FoodCategory.class);
        FoodCategory foodCategory1 = new FoodCategory();
        foodCategory1.setId(1L);
        FoodCategory foodCategory2 = new FoodCategory();
        foodCategory2.setId(foodCategory1.getId());
        assertThat(foodCategory1).isEqualTo(foodCategory2);
        foodCategory2.setId(2L);
        assertThat(foodCategory1).isNotEqualTo(foodCategory2);
        foodCategory1.setId(null);
        assertThat(foodCategory1).isNotEqualTo(foodCategory2);
    }
}
