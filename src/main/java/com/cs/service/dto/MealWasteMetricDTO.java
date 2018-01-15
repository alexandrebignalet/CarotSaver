package com.cs.service.dto;

public class MealWasteMetricDTO {
    public static int THREE_MONTHS_AGO = 3;
    public static int ONE_MONTH_AGO = 1;
    public static int ONE_WEEK_AGO = 1;

    private Long lastThreeMonths;
    private Long lastMonth;
    private Long lastWeek;

    public MealWasteMetricDTO(){}

    public Long getLastThreeMonths() {
        return lastThreeMonths;
    }

    public void setLastThreeMonths(Long lastThreeMonths) {
        this.lastThreeMonths = lastThreeMonths;
    }

    public Long getLastMonth() {
        return lastMonth;
    }

    public void setLastMonth(Long lastMonths) {
        this.lastMonth = lastMonths;
    }

    public Long getLastWeek() {
        return lastWeek;
    }

    public void setLastWeek(Long lastWeek) {
        this.lastWeek = lastWeek;
    }
}
