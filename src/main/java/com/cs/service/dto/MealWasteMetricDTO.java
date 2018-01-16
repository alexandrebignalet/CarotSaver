package com.cs.service.dto;

public class MealWasteMetricDTO {
    public static int THREE_MONTHS_AGO = 3;
    public static int ONE_MONTH_AGO = 1;
    public static int ONE_WEEK_AGO = 1;

    private double lastThreeMonths;
    private double lastMonth;
    private double lastWeek;

    public MealWasteMetricDTO(){}

    public MealWasteMetricDTO(double lastThreeMonths, double lastMonth, double lastWeek){
        this.lastMonth = lastMonth;
        this.lastThreeMonths = lastThreeMonths;
        this.lastWeek = lastWeek;
    }


    public double getLastThreeMonths() {
        return lastThreeMonths;
    }

    public void setLastThreeMonths(double lastThreeMonths) {
        this.lastThreeMonths = lastThreeMonths;
    }

    public double getLastMonth() {
        return lastMonth;
    }

    public void setLastMonth(double lastMonths) {
        this.lastMonth = lastMonths;
    }

    public double getLastWeek() {
        return lastWeek;
    }

    public void setLastWeek(double lastWeek) {
        this.lastWeek = lastWeek;
    }
}
