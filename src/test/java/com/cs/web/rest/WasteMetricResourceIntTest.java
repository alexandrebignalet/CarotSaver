package com.cs.web.rest;

import com.cs.CarotSaverApp;

import com.cs.domain.WasteMetric;
import com.cs.repository.WasteMetricRepository;
import com.cs.service.WasteMetricService;
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
 * Test class for the WasteMetricResource REST controller.
 *
 * @see WasteMetricResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CarotSaverApp.class)
public class WasteMetricResourceIntTest {

    private static final Long DEFAULT_PLASTIC = 1L;
    private static final Long UPDATED_PLASTIC = 2L;

    private static final Long DEFAULT_GREEN = 1L;
    private static final Long UPDATED_GREEN = 2L;

    private static final Long DEFAULT_OTHER = 1L;
    private static final Long UPDATED_OTHER = 2L;

    @Autowired
    private WasteMetricRepository wasteMetricRepository;

    @Autowired
    private WasteMetricService wasteMetricService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWasteMetricMockMvc;

    private WasteMetric wasteMetric;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WasteMetricResource wasteMetricResource = new WasteMetricResource(wasteMetricService);
        this.restWasteMetricMockMvc = MockMvcBuilders.standaloneSetup(wasteMetricResource)
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
    public static WasteMetric createEntity(EntityManager em) {
        WasteMetric wasteMetric = new WasteMetric()
            .plastic(DEFAULT_PLASTIC)
            .green(DEFAULT_GREEN)
            .other(DEFAULT_OTHER);
        return wasteMetric;
    }

    @Before
    public void initTest() {
        wasteMetric = createEntity(em);
    }

    @Test
    @Transactional
    public void createWasteMetric() throws Exception {
        int databaseSizeBeforeCreate = wasteMetricRepository.findAll().size();

        // Create the WasteMetric
        restWasteMetricMockMvc.perform(post("/api/waste-metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wasteMetric)))
            .andExpect(status().isCreated());

        // Validate the WasteMetric in the database
        List<WasteMetric> wasteMetricList = wasteMetricRepository.findAll();
        assertThat(wasteMetricList).hasSize(databaseSizeBeforeCreate + 1);
        WasteMetric testWasteMetric = wasteMetricList.get(wasteMetricList.size() - 1);
        assertThat(testWasteMetric.getPlastic()).isEqualTo(DEFAULT_PLASTIC);
        assertThat(testWasteMetric.getGreen()).isEqualTo(DEFAULT_GREEN);
        assertThat(testWasteMetric.getOther()).isEqualTo(DEFAULT_OTHER);
    }

    @Test
    @Transactional
    public void createWasteMetricWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wasteMetricRepository.findAll().size();

        // Create the WasteMetric with an existing ID
        wasteMetric.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWasteMetricMockMvc.perform(post("/api/waste-metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wasteMetric)))
            .andExpect(status().isBadRequest());

        // Validate the WasteMetric in the database
        List<WasteMetric> wasteMetricList = wasteMetricRepository.findAll();
        assertThat(wasteMetricList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWasteMetrics() throws Exception {
        // Initialize the database
        wasteMetricRepository.saveAndFlush(wasteMetric);

        // Get all the wasteMetricList
        restWasteMetricMockMvc.perform(get("/api/waste-metrics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wasteMetric.getId().intValue())))
            .andExpect(jsonPath("$.[*].plastic").value(hasItem(DEFAULT_PLASTIC.intValue())))
            .andExpect(jsonPath("$.[*].green").value(hasItem(DEFAULT_GREEN.intValue())))
            .andExpect(jsonPath("$.[*].other").value(hasItem(DEFAULT_OTHER.intValue())));
    }

    @Test
    @Transactional
    public void getWasteMetric() throws Exception {
        // Initialize the database
        wasteMetricRepository.saveAndFlush(wasteMetric);

        // Get the wasteMetric
        restWasteMetricMockMvc.perform(get("/api/waste-metrics/{id}", wasteMetric.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wasteMetric.getId().intValue()))
            .andExpect(jsonPath("$.plastic").value(DEFAULT_PLASTIC.intValue()))
            .andExpect(jsonPath("$.green").value(DEFAULT_GREEN.intValue()))
            .andExpect(jsonPath("$.other").value(DEFAULT_OTHER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWasteMetric() throws Exception {
        // Get the wasteMetric
        restWasteMetricMockMvc.perform(get("/api/waste-metrics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWasteMetric() throws Exception {
        // Initialize the database
        wasteMetricService.save(wasteMetric);

        int databaseSizeBeforeUpdate = wasteMetricRepository.findAll().size();

        // Update the wasteMetric
        WasteMetric updatedWasteMetric = wasteMetricRepository.findOne(wasteMetric.getId());
        updatedWasteMetric
            .plastic(UPDATED_PLASTIC)
            .green(UPDATED_GREEN)
            .other(UPDATED_OTHER);

        restWasteMetricMockMvc.perform(put("/api/waste-metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWasteMetric)))
            .andExpect(status().isOk());

        // Validate the WasteMetric in the database
        List<WasteMetric> wasteMetricList = wasteMetricRepository.findAll();
        assertThat(wasteMetricList).hasSize(databaseSizeBeforeUpdate);
        WasteMetric testWasteMetric = wasteMetricList.get(wasteMetricList.size() - 1);
        assertThat(testWasteMetric.getPlastic()).isEqualTo(UPDATED_PLASTIC);
        assertThat(testWasteMetric.getGreen()).isEqualTo(UPDATED_GREEN);
        assertThat(testWasteMetric.getOther()).isEqualTo(UPDATED_OTHER);
    }

    @Test
    @Transactional
    public void updateNonExistingWasteMetric() throws Exception {
        int databaseSizeBeforeUpdate = wasteMetricRepository.findAll().size();

        // Create the WasteMetric

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWasteMetricMockMvc.perform(put("/api/waste-metrics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wasteMetric)))
            .andExpect(status().isCreated());

        // Validate the WasteMetric in the database
        List<WasteMetric> wasteMetricList = wasteMetricRepository.findAll();
        assertThat(wasteMetricList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWasteMetric() throws Exception {
        // Initialize the database
        wasteMetricService.save(wasteMetric);

        int databaseSizeBeforeDelete = wasteMetricRepository.findAll().size();

        // Get the wasteMetric
        restWasteMetricMockMvc.perform(delete("/api/waste-metrics/{id}", wasteMetric.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WasteMetric> wasteMetricList = wasteMetricRepository.findAll();
        assertThat(wasteMetricList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WasteMetric.class);
        WasteMetric wasteMetric1 = new WasteMetric();
        wasteMetric1.setId(1L);
        WasteMetric wasteMetric2 = new WasteMetric();
        wasteMetric2.setId(wasteMetric1.getId());
        assertThat(wasteMetric1).isEqualTo(wasteMetric2);
        wasteMetric2.setId(2L);
        assertThat(wasteMetric1).isNotEqualTo(wasteMetric2);
        wasteMetric1.setId(null);
        assertThat(wasteMetric1).isNotEqualTo(wasteMetric2);
    }
}
