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
    
    /**
     * Campo opcional que indica si esta opción es la respuesta correcta.
     * Solo se utiliza cuando la encuesta es de tipo TEST o EXAM.
     * Este campo es de funcionamiento interno para calcular el número de aciertos en un test.
     * Por defecto es false.
     */
    private boolean isCorrect = false;
    
    @Column(name = "order_number")
    private Integer orderNumber;
    
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @JsonIgnore
    private Question question;
}
