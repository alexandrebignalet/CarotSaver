package com.cs.web.rest;

import com.cs.CarotSaverApp;

import com.cs.domain.MealRate;
import com.cs.repository.MealRateRepository;
import com.cs.service.MealRateService;
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
 * Test class for the MealRateResource REST controller.
 *
 * @see MealRateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CarotSaverApp.class)
public class MealRateResourceIntTest {

    private static final Integer DEFAULT_FIRST = 1;
    private static final Integer UPDATED_FIRST = 2;

    private static final Integer DEFAULT_MAIN = 1;
    private static final Integer UPDATED_MAIN = 2;

    private static final Integer DEFAULT_LAST = 1;
    private static final Integer UPDATED_LAST = 2;

    private static final Integer DEFAULT_OTHER = 1;
    private static final Integer UPDATED_OTHER = 2;

    @Autowired
    private MealRateRepository mealRateRepository;

    @Autowired
    private MealRateService mealRateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMealRateMockMvc;

    private MealRate mealRate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealRateResource mealRateResource = new MealRateResource(mealRateService);
        this.restMealRateMockMvc = MockMvcBuilders.standaloneSetup(mealRateResource)
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
    public static MealRate createEntity(EntityManager em) {
        MealRate mealRate = new MealRate()
            .first(DEFAULT_FIRST)
            .main(DEFAULT_MAIN)
            .last(DEFAULT_LAST)
            .other(DEFAULT_OTHER);
        return mealRate;
    }

    @Before
    public void initTest() {
        mealRate = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealRate() throws Exception {
        int databaseSizeBeforeCreate = mealRateRepository.findAll().size();

        // Create the MealRate
        restMealRateMockMvc.perform(post("/api/meal-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRate)))
            .andExpect(status().isCreated());

        // Validate the MealRate in the database
        List<MealRate> mealRateList = mealRateRepository.findAll();
        assertThat(mealRateList).hasSize(databaseSizeBeforeCreate + 1);
        MealRate testMealRate = mealRateList.get(mealRateList.size() - 1);
        assertThat(testMealRate.getFirst()).isEqualTo(DEFAULT_FIRST);
        assertThat(testMealRate.getMain()).isEqualTo(DEFAULT_MAIN);
        assertThat(testMealRate.getLast()).isEqualTo(DEFAULT_LAST);
        assertThat(testMealRate.getOther()).isEqualTo(DEFAULT_OTHER);
    }

    @Test
    @Transactional
    public void createMealRateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealRateRepository.findAll().size();

        // Create the MealRate with an existing ID
        mealRate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealRateMockMvc.perform(post("/api/meal-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRate)))
            .andExpect(status().isBadRequest());

        // Validate the MealRate in the database
        List<MealRate> mealRateList = mealRateRepository.findAll();
        assertThat(mealRateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMealRates() throws Exception {
        // Initialize the database
        mealRateRepository.saveAndFlush(mealRate);

        // Get all the mealRateList
        restMealRateMockMvc.perform(get("/api/meal-rates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealRate.getId().intValue())))
            .andExpect(jsonPath("$.[*].first").value(hasItem(DEFAULT_FIRST)))
            .andExpect(jsonPath("$.[*].main").value(hasItem(DEFAULT_MAIN)))
            .andExpect(jsonPath("$.[*].last").value(hasItem(DEFAULT_LAST)))
            .andExpect(jsonPath("$.[*].other").value(hasItem(DEFAULT_OTHER)));
    }

    @Test
    @Transactional
    public void getMealRate() throws Exception {
        // Initialize the database
        mealRateRepository.saveAndFlush(mealRate);

        // Get the mealRate
        restMealRateMockMvc.perform(get("/api/meal-rates/{id}", mealRate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealRate.getId().intValue()))
            .andExpect(jsonPath("$.first").value(DEFAULT_FIRST))
            .andExpect(jsonPath("$.main").value(DEFAULT_MAIN))
            .andExpect(jsonPath("$.last").value(DEFAULT_LAST))
            .andExpect(jsonPath("$.other").value(DEFAULT_OTHER));
    }

    @Test
    @Transactional
    public void getNonExistingMealRate() throws Exception {
        // Get the mealRate
        restMealRateMockMvc.perform(get("/api/meal-rates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealRate() throws Exception {
        // Initialize the database
        mealRateService.save(mealRate);

        int databaseSizeBeforeUpdate = mealRateRepository.findAll().size();

        // Update the mealRate
        MealRate updatedMealRate = mealRateRepository.findOne(mealRate.getId());
        updatedMealRate
            .first(UPDATED_FIRST)
            .main(UPDATED_MAIN)
            .last(UPDATED_LAST)
            .other(UPDATED_OTHER);

        restMealRateMockMvc.perform(put("/api/meal-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealRate)))
            .andExpect(status().isOk());

        // Validate the MealRate in the database
        List<MealRate> mealRateList = mealRateRepository.findAll();
        assertThat(mealRateList).hasSize(databaseSizeBeforeUpdate);
        MealRate testMealRate = mealRateList.get(mealRateList.size() - 1);
        assertThat(testMealRate.getFirst()).isEqualTo(UPDATED_FIRST);
        assertThat(testMealRate.getMain()).isEqualTo(UPDATED_MAIN);
        assertThat(testMealRate.getLast()).isEqualTo(UPDATED_LAST);
        assertThat(testMealRate.getOther()).isEqualTo(UPDATED_OTHER);
    }

    @Test
    @Transactional
    public void updateNonExistingMealRate() throws Exception {
        int databaseSizeBeforeUpdate = mealRateRepository.findAll().size();

        // Create the MealRate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMealRateMockMvc.perform(put("/api/meal-rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealRate)))
            .andExpect(status().isCreated());

        // Validate the MealRate in the database
        List<MealRate> mealRateList = mealRateRepository.findAll();
        assertThat(mealRateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMealRate() throws Exception {
        // Initialize the database
        mealRateService.save(mealRate);

        int databaseSizeBeforeDelete = mealRateRepository.findAll().size();

        // Get the mealRate
        restMealRateMockMvc.perform(delete("/api/meal-rates/{id}", mealRate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealRate> mealRateList = mealRateRepository.findAll();
        assertThat(mealRateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealRate.class);
        MealRate mealRate1 = new MealRate();
        mealRate1.setId(1L);
        MealRate mealRate2 = new MealRate();
        mealRate2.setId(mealRate1.getId());
        assertThat(mealRate1).isEqualTo(mealRate2);
        mealRate2.setId(2L);
        assertThat(mealRate1).isNotEqualTo(mealRate2);
        mealRate1.setId(null);
        assertThat(mealRate1).isNotEqualTo(mealRate2);
    }
}
