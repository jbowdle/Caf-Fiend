const modal = document.querySelector("#addDrinkModal");
const openModal = document.querySelector("#addDrinkBtn");
const closeModal = document.querySelector(".close");

openModal.addEventListener("click", () => modal.style.display = "block");
closeModal.addEventListener("click", () => modal.style.display = "none");

// if modal is open and the user clicks the window outside of it, close the modal
window.addEventListener("click", e => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

const addDrinkHandler = async(event) => {
  event.preventDefault();

  const beverage = document.querySelector("#beverageName").value.trim();
  const bev_type = document.querySelector("#beverageType").value.trim();
  const userIdInput = document.querySelector('input[name="user_id"]');
  const user_id = userIdInput.value;

  if (beverage && bev_type) {
    const response = await fetch('/api/drinks', {
      method: 'POST',
      body: JSON.stringify({ beverage, bev_type, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    }
  }
};

document
  .querySelector(".drink-form")
  .addEventListener("submit", addDrinkHandler);