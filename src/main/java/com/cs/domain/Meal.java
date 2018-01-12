package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Meal.
 */
@Entity
@Table(name = "meal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Meal extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nb_present")
    private Integer nbPresent;

    @ManyToOne
    private Menu menu;

    @OneToOne
    @JoinColumn(unique = true)
    private WasteMetric wasteMetric;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNbPresent() {
        return nbPresent;
    }

    public Meal nbPresent(Integer nbPresent) {
        this.nbPresent = nbPresent;
        return this;
    }

    public void setNbPresent(Integer nbPresent) {
        this.nbPresent = nbPresent;
    }

    public Menu getMenu() {
        return menu;
    }

    public Meal menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public WasteMetric getWasteMetric() {
        return wasteMetric;
    }

    public Meal wasteMetric(WasteMetric wasteMetric) {
        this.wasteMetric = wasteMetric;
        return this;
    }

    public void setWasteMetric(WasteMetric wasteMetric) {
        this.wasteMetric = wasteMetric;
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
        Meal meal = (Meal) o;
        if (meal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Meal{" +
            "id=" + getId() +
            ", nbPresent='" + getNbPresent() + "'" +
            "}";
    }
}
