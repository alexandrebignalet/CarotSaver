package com.cs.service.impl;

import com.cs.service.MealService;
import com.cs.domain.Meal;
import com.cs.repository.MealRepository;
import com.cs.service.dto.MealWasteMetricDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Service Implementation for managing Meal.
 */
@Service
@Transactional
public class MealServiceImpl implements MealService {

    private final Logger log = LoggerFactory.getLogger(MealServiceImpl.class);

    private final MealRepository mealRepository;

    public MealServiceImpl(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    /**
     * Save a meal.
     *
     * @param meal the entity to save
     * @return the persisted entity
     */
    @Override
    public Meal save(Meal meal) {
        log.debug("Request to save Meal : {}", meal);
        return mealRepository.save(meal);
    }

    public Boolean canBeCreated() {
        Date date = new Date();
        log.debug("Meal can be created for the " + date.toString() + "?");
        return getMealOfTheDay(date) == null;
    }

    @Override
    public List<Meal> getTopWaster(int limit, Boolean more) {
        log.debug("Request the top ten less wasters");
        return more ? this.mealRepository.findTopMoreWaster(limit) : this.mealRepository.findTopLessWaster(limit);
    }

    @Override
    public MealWasteMetricDTO getMealWasteMetric() {
        MealWasteMetricDTO mealWasteMetricDTO = new MealWasteMetricDTO();
        Instant threeMonthsAgo = LocalDate.now().minusMonths(MealWasteMetricDTO.THREE_MONTHS_AGO).atStartOfDay().toInstant(ZoneOffset.UTC);

        List<Meal> meals = this.mealRepository.findMealsByCreatedDateBetween(threeMonthsAgo, Instant.now());

        Instant oneMonthAgo = LocalDate.now().minusMonths(MealWasteMetricDTO.ONE_MONTH_AGO).atStartOfDay().toInstant(ZoneOffset.UTC);
        Instant oneWeekAgo= LocalDate.now().minusWeeks(MealWasteMetricDTO.ONE_WEEK_AGO).atStartOfDay().toInstant(ZoneOffset.UTC);

        Long sumThreeMonths = 0L, sumLastMonth = 0L, sumLastWeek = 0L;
        int index = 0, indexWeek = 0, indexMonth = 0;

        for (Meal meal: meals) {
            sumThreeMonths += meal.getWasteMetric().getTotal();

            if( meal.getCreatedDate().isAfter(oneWeekAgo) ) {
                indexWeek = meals.size() - index;
                sumLastWeek += meal.getWasteMetric().getTotal();
            }

            if( meal.getCreatedDate().isAfter(oneMonthAgo)) {
                indexMonth = meals.size() - index;
                sumLastMonth += meal.getWasteMetric().getTotal();
            }

            index++;
        }
System.out.println(index);
System.out.println(indexWeek);
System.out.println(indexMonth);
        mealWasteMetricDTO.setLastThreeMonths(index == 0 ? 0 : (sumThreeMonths/index));
        mealWasteMetricDTO.setLastMonth(indexWeek == 0 ? 0 : (sumLastMonth/indexWeek));
        mealWasteMetricDTO.setLastWeek(indexMonth == 0 ? 0 : (sumLastWeek/indexMonth));

        return mealWasteMetricDTO;
    }

    public Meal getMealOfTheDay(Date date) {
        ZonedDateTime startOfDay = ZonedDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault()).toLocalDate().atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime tomorrowStartOfDay = startOfDay.plusDays(1);

        List<Meal> meals = findByCreatedDateBetween(startOfDay.toInstant(), tomorrowStartOfDay.toInstant());
        return meals.isEmpty() ?  null : meals.get(0);
    }

    /**
     *  Get all the meals.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Meal> findAll() {
        log.debug("Request to get all Meals");
        return mealRepository.findAll();
    }

    /**
     *  Get all the meals between dates.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Meal> findByCreatedDateBetween(Instant startDate, Instant endDate) {
        return this.mealRepository.findMealsByCreatedDateBetween(startDate, endDate);
    }

    /**
     *  Get one meal by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Meal findOne(Long id) {
        log.debug("Request to get Meal : {}", id);
        return mealRepository.findOne(id);
    }

    /**
     *  Delete the  meal by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Meal : {}", id);
        mealRepository.delete(id);
    }
}
