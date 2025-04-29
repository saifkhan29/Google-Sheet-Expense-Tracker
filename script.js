document.getElementById("expenseForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const item = document.getElementById('item').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const category = document.getElementById('category').value;

    if (!item || !amount || !category) {
        alert("Please fill all fields.");
        return;
    }

    // Get current date in a readable format
    const date = new Date().toLocaleString();

    // Prepare the data in the correct format
    const expenseData = [{
        date: date,  // Use formatted date here
        item: item,
        amount: parseFloat(amount),  // Convert amount to a number
        category: category
    }];

    // Log the data for debugging
    console.log(expenseData);

    try {
        const response = await fetch('https://sheetdb.io/api/v1/soylzy7687k7f', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expenseData)  // Sending the data as a JSON string
        });

        const result = await response.json();
        console.log(result);
        document.getElementById('successMessage').classList.remove('hidden');

        // Clear form after submission
        document.getElementById('item').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert("Error submitting expense.");
    }
});
