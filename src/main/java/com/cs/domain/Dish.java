package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.cs.domain.enumeration.DishType;

/**
 * A Dish.
 */
@Entity
@Table(name = "dish")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Dish implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private DishType type;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "dish_food_categories",
               joinColumns = @JoinColumn(name="dishes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="food_categories_id", referencedColumnName="id"))
    private Set<FoodCategory> foodCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Dish name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DishType getType() {
        return type;
    }

    public Dish type(DishType type) {
        this.type = type;
        return this;
    }

    public void setType(DishType type) {
        this.type = type;
    }

    public Set<FoodCategory> getFoodCategories() {
        return foodCategories;
    }

    public Dish foodCategories(Set<FoodCategory> foodCategories) {
        this.foodCategories = foodCategories;
        return this;
    }

    public Dish addFoodCategories(FoodCategory foodCategory) {
        this.foodCategories.add(foodCategory);
        return this;
    }

    public Dish removeFoodCategories(FoodCategory foodCategory) {
        this.foodCategories.remove(foodCategory);
        return this;
    }

    public void setFoodCategories(Set<FoodCategory> foodCategories) {
        this.foodCategories = foodCategories;
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
        Dish dish = (Dish) o;
        if (dish.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dish.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Dish{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
