package com.survey.system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "question_responses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "survey_response_id", nullable = false)
    @JsonIgnore
    private SurveyResponse surveyResponse;
    
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    
    @ManyToMany
    @JoinTable(
        name = "selected_answer_options",
        joinColumns = @JoinColumn(name = "question_response_id"),
        inverseJoinColumns = @JoinColumn(name = "answer_option_id")
    )
    private List<AnswerOption> selectedOptions = new ArrayList<>();
}
