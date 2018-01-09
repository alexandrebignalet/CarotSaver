package com.cs.web.rest;

import com.cs.CarotSaverApp;

import com.cs.domain.SatisfactionSurvey;
import com.cs.repository.SatisfactionSurveyRepository;
import com.cs.service.SatisfactionSurveyService;
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
 * Test class for the SatisfactionSurveyResource REST controller.
 *
 * @see SatisfactionSurveyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CarotSaverApp.class)
public class SatisfactionSurveyResourceIntTest {

    private static final String DEFAULT_STUDENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_NAME = "BBBBBBBBBB";

    @Autowired
    private SatisfactionSurveyRepository satisfactionSurveyRepository;

    @Autowired
    private SatisfactionSurveyService satisfactionSurveyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSatisfactionSurveyMockMvc;

    private SatisfactionSurvey satisfactionSurvey;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SatisfactionSurveyResource satisfactionSurveyResource = new SatisfactionSurveyResource(satisfactionSurveyService);
        this.restSatisfactionSurveyMockMvc = MockMvcBuilders.standaloneSetup(satisfactionSurveyResource)
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
    public static SatisfactionSurvey createEntity(EntityManager em) {
        SatisfactionSurvey satisfactionSurvey = new SatisfactionSurvey()
            .studentName(DEFAULT_STUDENT_NAME);
        return satisfactionSurvey;
    }

    @Before
    public void initTest() {
        satisfactionSurvey = createEntity(em);
    }

    @Test
    @Transactional
    public void createSatisfactionSurvey() throws Exception {
        int databaseSizeBeforeCreate = satisfactionSurveyRepository.findAll().size();

        // Create the SatisfactionSurvey
        restSatisfactionSurveyMockMvc.perform(post("/api/satisfaction-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(satisfactionSurvey)))
            .andExpect(status().isCreated());

        // Validate the SatisfactionSurvey in the database
        List<SatisfactionSurvey> satisfactionSurveyList = satisfactionSurveyRepository.findAll();
        assertThat(satisfactionSurveyList).hasSize(databaseSizeBeforeCreate + 1);
        SatisfactionSurvey testSatisfactionSurvey = satisfactionSurveyList.get(satisfactionSurveyList.size() - 1);
        assertThat(testSatisfactionSurvey.getStudentName()).isEqualTo(DEFAULT_STUDENT_NAME);
    }

    @Test
    @Transactional
    public void createSatisfactionSurveyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = satisfactionSurveyRepository.findAll().size();

        // Create the SatisfactionSurvey with an existing ID
        satisfactionSurvey.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSatisfactionSurveyMockMvc.perform(post("/api/satisfaction-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(satisfactionSurvey)))
            .andExpect(status().isBadRequest());

        // Validate the SatisfactionSurvey in the database
        List<SatisfactionSurvey> satisfactionSurveyList = satisfactionSurveyRepository.findAll();
        assertThat(satisfactionSurveyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSatisfactionSurveys() throws Exception {
        // Initialize the database
        satisfactionSurveyRepository.saveAndFlush(satisfactionSurvey);

        // Get all the satisfactionSurveyList
        restSatisfactionSurveyMockMvc.perform(get("/api/satisfaction-surveys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(satisfactionSurvey.getId().intValue())))
            .andExpect(jsonPath("$.[*].studentName").value(hasItem(DEFAULT_STUDENT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSatisfactionSurvey() throws Exception {
        // Initialize the database
        satisfactionSurveyRepository.saveAndFlush(satisfactionSurvey);

        // Get the satisfactionSurvey
        restSatisfactionSurveyMockMvc.perform(get("/api/satisfaction-surveys/{id}", satisfactionSurvey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(satisfactionSurvey.getId().intValue()))
            .andExpect(jsonPath("$.studentName").value(DEFAULT_STUDENT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSatisfactionSurvey() throws Exception {
        // Get the satisfactionSurvey
        restSatisfactionSurveyMockMvc.perform(get("/api/satisfaction-surveys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSatisfactionSurvey() throws Exception {
        // Initialize the database
        satisfactionSurveyService.save(satisfactionSurvey);

        int databaseSizeBeforeUpdate = satisfactionSurveyRepository.findAll().size();

        // Update the satisfactionSurvey
        SatisfactionSurvey updatedSatisfactionSurvey = satisfactionSurveyRepository.findOne(satisfactionSurvey.getId());
        updatedSatisfactionSurvey
            .studentName(UPDATED_STUDENT_NAME);

        restSatisfactionSurveyMockMvc.perform(put("/api/satisfaction-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSatisfactionSurvey)))
            .andExpect(status().isOk());

        // Validate the SatisfactionSurvey in the database
        List<SatisfactionSurvey> satisfactionSurveyList = satisfactionSurveyRepository.findAll();
        assertThat(satisfactionSurveyList).hasSize(databaseSizeBeforeUpdate);
        SatisfactionSurvey testSatisfactionSurvey = satisfactionSurveyList.get(satisfactionSurveyList.size() - 1);
        assertThat(testSatisfactionSurvey.getStudentName()).isEqualTo(UPDATED_STUDENT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSatisfactionSurvey() throws Exception {
        int databaseSizeBeforeUpdate = satisfactionSurveyRepository.findAll().size();

        // Create the SatisfactionSurvey

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSatisfactionSurveyMockMvc.perform(put("/api/satisfaction-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(satisfactionSurvey)))
            .andExpect(status().isCreated());

        // Validate the SatisfactionSurvey in the database
        List<SatisfactionSurvey> satisfactionSurveyList = satisfactionSurveyRepository.findAll();
        assertThat(satisfactionSurveyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSatisfactionSurvey() throws Exception {
        // Initialize the database
        satisfactionSurveyService.save(satisfactionSurvey);

        int databaseSizeBeforeDelete = satisfactionSurveyRepository.findAll().size();

        // Get the satisfactionSurvey
        restSatisfactionSurveyMockMvc.perform(delete("/api/satisfaction-surveys/{id}", satisfactionSurvey.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SatisfactionSurvey> satisfactionSurveyList = satisfactionSurveyRepository.findAll();
        assertThat(satisfactionSurveyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SatisfactionSurvey.class);
        SatisfactionSurvey satisfactionSurvey1 = new SatisfactionSurvey();
        satisfactionSurvey1.setId(1L);
        SatisfactionSurvey satisfactionSurvey2 = new SatisfactionSurvey();
        satisfactionSurvey2.setId(satisfactionSurvey1.getId());
        assertThat(satisfactionSurvey1).isEqualTo(satisfactionSurvey2);
        satisfactionSurvey2.setId(2L);
        assertThat(satisfactionSurvey1).isNotEqualTo(satisfactionSurvey2);
        satisfactionSurvey1.setId(null);
        assertThat(satisfactionSurvey1).isNotEqualTo(satisfactionSurvey2);
    }
}
