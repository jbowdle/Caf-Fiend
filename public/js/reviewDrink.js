// May be possible to combine this file with addDrink.js to reduce repetition and avoid errors

const reviewModal = document.querySelector("#reviewDrinkModal");
const openReviewModal = document.querySelectorAll(".reviewDrinkBtn");
const closeReviewModal = document.querySelector(".close");

let drink_id;

openReviewModal.forEach(btn => {
  btn.addEventListener("click", (e) => {
    drink_id = e.target.dataset.drinkid;
    reviewModal.style.display = "block"
  });
});

closeReviewModal.addEventListener("click", () => {
  reviewModal.style.display = "none";
});

// if modal is open and the user clicks the window outside of it, close the modal
window.addEventListener("click", e => {
  if (e.target == reviewModal) {
    reviewModal.style.display = "none";
  }
});

const reviewDrinkHandler = async(event) => {
  event.preventDefault();

  const rating = document.querySelector("#rating-select").value;
  const review = document.querySelector("#review").value.trim();

  if (rating) {
    const response = await fetch('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({ rating, review, drink_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    }
  }
};

document
  .querySelector(".review-form")
  .addEventListener("submit", reviewDrinkHandler);