package com.cs.repository;

import com.cs.domain.DishServe;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DishServe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DishServeRepository extends JpaRepository<DishServe, Long> {

}
