package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SatisfactionSurvey.
 */
@Entity
@Table(name = "satisfaction_survey")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SatisfactionSurvey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name")
    private String studentName;

    @OneToOne
    @JoinColumn(unique = true)
    private MealRate qualityRate;

    @OneToOne
    @JoinColumn(unique = true)
    private MealRate quantityRate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public SatisfactionSurvey studentName(String studentName) {
        this.studentName = studentName;
        return this;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public MealRate getQualityRate() {
        return qualityRate;
    }

    public SatisfactionSurvey qualityRate(MealRate mealRate) {
        this.qualityRate = mealRate;
        return this;
    }

    public void setQualityRate(MealRate mealRate) {
        this.qualityRate = mealRate;
    }

    public MealRate getQuantityRate() {
        return quantityRate;
    }

    public SatisfactionSurvey quantityRate(MealRate mealRate) {
        this.quantityRate = mealRate;
        return this;
    }

    public void setQuantityRate(MealRate mealRate) {
        this.quantityRate = mealRate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SatisfactionSurvey satisfactionSurvey = (SatisfactionSurvey) o;
        if (satisfactionSurvey.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), satisfactionSurvey.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SatisfactionSurvey{" +
            "id=" + getId() +
            ", studentName='" + getStudentName() + "'" +
            "}";
    }
}
