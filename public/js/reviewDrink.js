// May be possible to combine this file with addDrink.js to reduce repetition and avoid errors

const reviewModal = document.querySelector("#reviewDrinkModal");
const editModal= document.querySelector("#editReviewModal");
const openReviewModal = document.querySelectorAll(".reviewDrinkBtn");
const openEditModal = document.querySelectorAll(".editReviewBtn");
const closeReviewModal = document.querySelector(".closeAdd");
const closeEditModal = document.querySelector(".closeEdit");

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

if (openEditModal) {
  openEditModal.forEach(btn => {
    btn.addEventListener("click", (e) => {
      drink_id = e.target.dataset.drinkid;
      rating_id = e.target.dataset.ratingid;
      editModal.style.display = "block"
    });
  });
}
if (closeEditModal) {
  closeEditModal.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target == editModal) {
      editModal.style.display = "none";
    }
  });
}

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

    if (response.ok && currentRating.ok) {
      document.location.reload();
    } else {
      window.alert("There was an error processing this new rating/review. You've likely already rated this drink. Please check your dashboard if you would like to update your rating/review.");
      document.location.reload();
    }
  }
};

const reviewDrinkHandler = async(event) => {
  event.preventDefault();

  const ratingData = document.querySelector("#edit-rating-select").value;
  const reviewData = document.querySelector("#edit-review").value.trim();

  if (ratingData) {
    const response = await fetch(`/api/ratings/${rating_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        rating: ratingData,
        review: reviewData
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const currentRating = await fetch(`/api/drinks/${drink_id}`, {
      method: 'PUT',
    });

    if (response.ok && currentRating.ok) {
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