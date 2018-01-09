package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A MealRate.
 */
@Entity
@Table(name = "meal_rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MealRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first")
    private Integer first;

    @Column(name = "main")
    private Integer main;

    @Column(name = "last")
    private Integer last;

    @Column(name = "other")
    private Integer other;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFirst() {
        return first;
    }

    public MealRate first(Integer first) {
        this.first = first;
        return this;
    }

    public void setFirst(Integer first) {
        this.first = first;
    }

    public Integer getMain() {
        return main;
    }

    public MealRate main(Integer main) {
        this.main = main;
        return this;
    }

    public void setMain(Integer main) {
        this.main = main;
    }

    public Integer getLast() {
        return last;
    }

    public MealRate last(Integer last) {
        this.last = last;
        return this;
    }

    public void setLast(Integer last) {
        this.last = last;
    }

    public Integer getOther() {
        return other;
    }

    public MealRate other(Integer other) {
        this.other = other;
        return this;
    }

    public void setOther(Integer other) {
        this.other = other;
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
        MealRate mealRate = (MealRate) o;
        if (mealRate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealRate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealRate{" +
            "id=" + getId() +
            ", first='" + getFirst() + "'" +
            ", main='" + getMain() + "'" +
            ", last='" + getLast() + "'" +
            ", other='" + getOther() + "'" +
            "}";
    }
}
