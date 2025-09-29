package es.ucm.fdi.pad.android01;

import org.junit.Test;

public class CalculatorAddUnitTest {

    @Test
    public void add_isCorrect() {
        CalculatorAdd calculator = new CalculatorAdd();
        assert(calculator.addNumbers(2, 3) == 5);
        assert(calculator.addNumbers(10, 0) == 10);
        assert(calculator.addNumbers(1.5, 0.5) == 2.0);
        assert(calculator.addNumbers(8, 30.1) == 38.1);
    }
}
