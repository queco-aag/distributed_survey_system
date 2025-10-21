package com.survey.system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answer_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String text;
    
    private boolean isCorrect = false;
    
    @Column(name = "order_number")
    private Integer orderNumber;
    
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @JsonIgnore
    private Question question;
}
