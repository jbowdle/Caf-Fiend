// May be possible to combine this file with addDrink.js to reduce repetition and avoid errors

const reviewModal = document.querySelector("#reviewDrinkModal");
const openReviewModal = document.querySelectorAll(".reviewDrinkBtn");
const closeReviewModal = document.querySelector(".close");

let drink_id;
let rating_id;

openReviewModal.forEach(btn => {
  btn.addEventListener("click", (e) => {
    drink_id = e.target.dataset.drinkid;
    rating_id = e.target.dataset.ratingid;
    reviewModal.style.display = "block"
  });
});

closeReviewModal.addEventListener("click", () => {
  reviewModal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target == reviewModal) {
    reviewModal.style.display = "none";
  }
});

const addReviewHandler = async(event) => {
  event.preventDefault();

  const rating = document.querySelector("#rating-select").value;
  const review = document.querySelector("#review").value.trim();

  if (rating) {
    const response = await fetch('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({ rating, review, drink_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    const currentRating = await fetch(`/api/drinks/${drink_id}`, {
      method: 'PUT',
    });
    const updateRating = await currentRating.json();

    if (response.ok && updateRating.ok) {
      document.location.reload();
    }
  }
};

const reviewDrinkHandler = async(event) => {
  event.preventDefault();

  const rating = document.querySelector("#rating-select").value;
  const review = document.querySelector("#review").value.trim();

  if (rating) {
    const response = await fetch(`/api/ratings/${rating_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        rating: rating,
        review: review
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const currentRating = await fetch(`/api/drinks/${drink_id}`, {
      method: 'PUT',
    });
    const updateRating = await currentRating.json();

    if (response.ok && updateRating.ok) {
      document.location.reload();
    }
  }
};

if (document.querySelector(".edit-review-form")) {
document
  .querySelector(".edit-review-form")
  .addEventListener("submit", reviewDrinkHandler);
}
if (document.querySelector(".add-review-form")) {
document
  .querySelector(".add-review-form")
  .addEventListener("submit", addReviewHandler);
}