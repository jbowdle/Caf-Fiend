const addDrinkHandler = async(event) => {
  event.preventDefault();

  const beverage = document.querySelector("#beverageName").value.trim();
  const type = document.querySelector("#beverageType").value.trim();

  if (beverage && type) {
    const response = await fetch('/api/drinks', {
      method: 'POST',
      body: JSON.stringify({ beverage, type }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/create`);
      alert('Drink created');
    }
  }
};

document
  .querySelector(".drink-form")
  .addEventListener("submit", addDrinkHandler);