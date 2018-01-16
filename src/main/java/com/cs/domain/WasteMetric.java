package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A WasteMetric.
 */
@Entity
@Table(name = "waste_metric")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WasteMetric implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plastic")
    private Long plastic;

    @Column(name = "green")
    private Long green;

    @Column(name = "other")
    private Long other;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlastic() {
        return plastic;
    }

    public WasteMetric plastic(Long plastic) {
        this.plastic = plastic;
        return this;
    }

    public void setPlastic(Long plastic) {
        this.plastic = plastic;
    }

    public Long getGreen() {
        return green;
    }

    public WasteMetric green(Long green) {
        this.green = green;
        return this;
    }

    public void setGreen(Long green) {
        this.green = green;
    }

    public Long getOther() {
        return other;
    }

    public WasteMetric other(Long other) {
        this.other = other;
        return this;
    }

    public Long getTotal() {
        return green + other;
    }

    public void setOther(Long other) {
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
        WasteMetric wasteMetric = (WasteMetric) o;
        if (wasteMetric.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), wasteMetric.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WasteMetric{" +
            "id=" + getId() +
            ", plastic='" + getPlastic() + "'" +
            ", green='" + getGreen() + "'" +
            ", other='" + getOther() + "'" +
            "}";
    }
}
