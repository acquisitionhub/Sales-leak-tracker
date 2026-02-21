// Sample data representing sales leaks
let leaksData = [
  {
    name: "Silent Phone",
    triggerValue: 10,
    actualValue: 22.58,
    notes: "Leads not contacted",
    revenueImpact: 21397,
    paymentStatus: "Pending"
  },
  {
    name: "Ghosting Peak",
    triggerValue: 15,
    actualValue: 8.70,
    notes: "Consult no-shows",
    revenueImpact: 6113,
    paymentStatus: "Pending"
  },
  {
    name: "Treatment Completion",
    triggerValue: 15,
    actualValue: 71.43,
    notes: "Started but not finished",
    revenueImpact: 45850,
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

// Add new leak from the form
function addLeak(event) {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById("leakName").value;
  const triggerValue = parseFloat(document.getElementById("triggerValue").value);
  const actualValue = parseFloat(document.getElementById("actualValue").value);
  const revenueImpact = parseFloat(document.getElementById("revenueImpact").value);
  const notes = document.getElementById("notes").value;

  const newLeak = {
    name,
    triggerValue,
    actualValue,
    notes,
    revenueImpact,
    paymentStatus: "Pending"
  };

  leaksData.push(newLeak);  // Add the new leak to the array
  displayLeaks();  // Re-render the leaks table
  document.getElementById("add-leak-form").reset();  // Reset form
}

// Sorting leaks by revenue or trigger value
function sortLeaks(criteria) {
  if (criteria === 'revenue') {
    leaksData.sort((a, b) => b.revenueImpact - a.revenueImpact);
  } else if (criteria === 'trigger') {
    leaksData.sort((a, b) => b.triggerValue - a.triggerValue);
  }
  displayLeaks();  // Re-render the sorted table
}

// Filtering leaks to show only ALERTS
function filterLeaks() {
  const filteredLeaks = leaksData.filter(leak => leak.actualValue > leak.triggerValue);
  leaksData = filteredLeaks;  // Update leaks data with filtered leaks
  displayLeaks();  // Re-render the table
}

// Initial call to display leaks on page load
displayLeaks();
