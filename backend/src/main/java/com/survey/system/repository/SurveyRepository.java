package com.survey.system.repository;

import com.survey.system.model.Survey;
import com.survey.system.model.SurveyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    List<Survey> findByType(SurveyType type);
    List<Survey> findByActive(boolean active);
}
