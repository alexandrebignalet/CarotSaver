package com.cs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DishServe.
 */
@Entity
@Table(name = "dish_serve")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DishServe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nb_present")
    private Integer nbPresent;

    @OneToOne
    @JoinColumn(unique = true)
    private Menu menu;

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

    public DishServe nbPresent(Integer nbPresent) {
        this.nbPresent = nbPresent;
        return this;
    }

    public void setNbPresent(Integer nbPresent) {
        this.nbPresent = nbPresent;
    }

    public Menu getMenu() {
        return menu;
    }

    public DishServe menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
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
        DishServe dishServe = (DishServe) o;
        if (dishServe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dishServe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DishServe{" +
            "id=" + getId() +
            ", nbPresent='" + getNbPresent() + "'" +
            "}";
    }
}
