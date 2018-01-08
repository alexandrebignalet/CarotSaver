package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @OneToOne
    @JoinColumn(unique = true)
    private WasteMetric wasteMetric;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "menu_meals",
               joinColumns = @JoinColumn(name="menus_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="meals_id", referencedColumnName="id"))
    private Set<Meal> meals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Menu date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public WasteMetric getWasteMetric() {
        return wasteMetric;
    }

    public Menu wasteMetric(WasteMetric wasteMetric) {
        this.wasteMetric = wasteMetric;
        return this;
    }

    public void setWasteMetric(WasteMetric wasteMetric) {
        this.wasteMetric = wasteMetric;
    }

    public Set<Meal> getMeals() {
        return meals;
    }

    public Menu meals(Set<Meal> meals) {
        this.meals = meals;
        return this;
    }

    public Menu addMeals(Meal meal) {
        this.meals.add(meal);
        return this;
    }

    public Menu removeMeals(Meal meal) {
        this.meals.remove(meal);
        return this;
    }

    public void setMeals(Set<Meal> meals) {
        this.meals = meals;
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
        Menu menu = (Menu) o;
        if (menu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), menu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
