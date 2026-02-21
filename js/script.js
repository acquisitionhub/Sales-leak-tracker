// Sample data representing sales leaks
const leaksData = [
  {
    name: "Silent Phone",
    triggerValue: 10, // percentage
    actualValue: 22.58, // percentage
    notes: "Leads not contacted",
    revenueImpact: 21397, // £
    paymentStatus: "Pending"
  },
  {
    name: "Ghosting Peak",
    triggerValue: 15, // percentage
    actualValue: 8.70, // percentage
    notes: "Consult no-shows",
    revenueImpact: 6113, // £
    paymentStatus: "Pending"
  },
  {
    name: "Treatment Completion",
    triggerValue: 15, // percentage
    actualValue: 71.43, // percentage
    notes: "Started but not finished",
    revenueImpact: 45850, // £
    paymentStatus: "Pending"
  }
];

// Function to create and display rows in the table
function displayLeaks() {
  const tableBody = document.querySelector("#leaks-table tbody");
  tableBody.innerHTML = ''; // Clear existing rows

  leaksData.forEach(leak => {
    const row = document.createElement('tr');

    // Status logic: Check if actual value exceeds trigger value
    let statusClass = leak.actualValue > leak.triggerValue ? 'alert' : 'ok';
    let statusText = leak.actualValue > leak.triggerValue ? '🚨 ALERT' : 'OK';

    row.innerHTML = `
      <td>${leak.name}</td>
      <td>${leak.triggerValue}%</td>
      <td>${leak.actualValue}%</td>
      <td class="${statusClass}">${statusText}</td>
      <td class="revenue">£${leak.revenueImpact}</td>
      <td>${leak.paymentStatus}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Call the function to display leaks on page load
displayLeaks();
