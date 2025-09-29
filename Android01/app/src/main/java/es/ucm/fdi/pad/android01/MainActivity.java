package es.ucm.fdi.pad.android01;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";
    private Button calcularButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "activity created");
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        calcularButton = findViewById(R.id.button);
        calcularButton.setOnClickListener(view -> {
            Log.i(TAG, "button Calcular pressed");

            if (((EditText)findViewById(R.id.editTextNumberDecimal)).getText().toString().isEmpty() ||
                    ((EditText)findViewById(R.id.editTextNumberDecimal2)).getText().toString().isEmpty()) {
                Log.w(TAG, "one of the fields is empty");
                return;
            }
            final Double num1 = Double.valueOf(((EditText)findViewById(R.id.editTextNumberDecimal)).getText().toString());
            final Double num2 = Double.valueOf(((EditText)findViewById(R.id.editTextNumberDecimal2)).getText().toString());
            Log.i(TAG, "num1 = " + num1 + ", num2 = " + num2);
            final Double result = CalculatorAdd.addNumbers(num1, num2);
            Log.i(TAG, "result = " + result);
            Intent intentResult = new Intent(this, CalculatorAddResultActivity.class);
            intentResult.putExtra("result", result);
            Log.d(TAG, "intentResult created");
            startActivity(intentResult);
            Log.d(TAG, "CalculatorAddResultActivity started");

        });

    }
}