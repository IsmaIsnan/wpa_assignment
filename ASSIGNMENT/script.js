// Get DOM elements
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculate-bmi');
const clearBtn = document.getElementById('clear-bmi');
const bmiResult = document.getElementById('bmi-result');
const bmiWarning = document.getElementById('bmi-warning');
const scaleContainer = document.getElementById('scale-container');

// Function to calculate BMI
function calculateBMI(event) {
    event.preventDefault(); // Prevent form submission

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100; // Convert cm to meters

    // Check if inputs are valid positive numbers
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        bmiResult.textContent = 'Please enter valid positive numbers for both weight and height.';
        bmiWarning.textContent = '';
        scaleContainer.innerHTML = '';
        return;
    }

    // Calculate BMI
    const bmi = weight / (height * height);
    bmiResult.textContent = `Your BMI is: ${bmi.toFixed(2)}`;

    // Determine BMI category
    let bmiCategory;
    if (bmi < 18.5) {
        bmiCategory = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = "Normal Weight";
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
        bmiCategory = "Obesity Class I";
    } else if (bmi >= 35 && bmi < 40) {
        bmiCategory = "Obesity Class II";
    } else {
        bmiCategory = "Obesity Class III";
    }

    bmiWarning.textContent = `This means you are considered: ${bmiCategory}`;

    // Update BMI scale visualization
    updateBmiScale(bmiCategory);
}

// Function to clear the inputs and results
function clearBMI() {
    weightInput.value = '';
    heightInput.value = '';
    bmiResult.textContent = '';
    bmiWarning.textContent = '';
    scaleContainer.innerHTML = ''; // Clear previous scale
}

// Function to create and display BMI scale
function updateBmiScale(bmiCategory) {
    scaleContainer.innerHTML = ''; // Clear previous scale

    // Define scale data
    const scaleData = [
        { bmi: 18.5, color: "dodgerblue", label: "Under 18.5", category: "Underweight" },
        { bmi: 24.9, color: "limegreen", label: "18.5 - 24.9", category: "Normal Weight" },
        { bmi: 29.9, color: "gold", label: "25-29.9", category: "Overweight" },
        { bmi: 34.9, color: "orange", label: "30-34.9", category: "Obesity Class I" },
        { bmi: 39.9, color: "crimson", label: "35-39.9", category: "Obesity Class II" },
        { bmi: Infinity, color: "maroon", label: "Over 40", category: "Obesity Class III" }
    ];

    // Create scale bars with tooltips
    scaleData.forEach(scale => {
        const bar = document.createElement('div');
        bar.style.backgroundColor = scale.color;
        bar.style.width = '30px';
        bar.style.height = '30px';
        bar.style.margin = '5px';
        bar.style.display = 'inline-block';
        bar.style.borderRadius = '5px';
        bar.setAttribute('title', `${scale.label}: ${scale.category}`); // Tooltip

        // Highlight the category based on the calculated BMI
        if (scale.category === bmiCategory) {
            bar.style.border = '3px solid black';
        }

        scaleContainer.appendChild(bar);
    });
}

// Event listeners
calculateBtn.addEventListener('click', calculateBMI);
clearBtn.addEventListener('click', clearBMI);
