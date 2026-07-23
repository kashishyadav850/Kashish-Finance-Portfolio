// --- Portfolio Allocation Chart ---
const ctx = document.getElementById('allocationChart').getContext('2d');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['NIFTYIETF', 'HAL', 'GOLDIETF', 'ICICIBANK', 'TATAPOWER', 'TATAGOLD', 'SILVERIETF'],
    datasets: [{
      data: [8.7, 28.5, 5.8, 23.4, 24.3, 2.2, 7.0],  // your actual weights from the Python tool, as %
      backgroundColor: [
        '#1b4332', '#2d6a4f', '#40916c', '#74c69d',
        '#95d5b2', '#b7e4c7', '#d8f3dc'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#1c1c1e', font: { family: 'Inter', size: 12 } }
      }
    }
  }
});

// --- Budget Calculator ---
function calculateBudget() {
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(income) || isNaN(expenses) || income <= 0) {
    resultDiv.innerHTML = '<span class="bad">Please enter valid numbers.</span>';
    return;
  }

  const savings = income - expenses;
  const savingsRate = (savings / income) * 100;

  let message = `Monthly Savings: ₹${savings.toLocaleString('en-IN')}<br>`;
  message += `Savings Rate: ${savingsRate.toFixed(1)}%<br><br>`;

  if (savingsRate >= 30) {
    message += '<span class="good">Excellent! You\'re saving well above the recommended 20% benchmark.</span>';
  } else if (savingsRate >= 20) {
    message += '<span class="good">Good — you\'re at or above the recommended 20% savings rate.</span>';
  } else if (savingsRate >= 0) {
    message += '<span class="warn">Below the recommended 20% savings rate. Consider trimming expenses.</span>';
  } else {
    message += '<span class="bad">You\'re spending more than you earn. This needs attention.</span>';
  }

  resultDiv.innerHTML = message;
}