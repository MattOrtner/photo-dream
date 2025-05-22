const searchInput = document.getElementById("searchInput");
const previousSearchContainer = document.getElementById(
  "previousSearchContainer"
);
const previousSearches = document.getElementsByClassName("previous-search");

document.getElementById("searchButton").addEventListener("click", () => {
  fetch(
    "http://localhost:5000/api/data?query=" +
      encodeURIComponent(searchInput.value)
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.length === 0 || !data.results) {
        console.error("Invalid data format:", data);
        return;
      }

      if (previousSearches.length > 0) {
        for (let prevSearch of previousSearches) {
          if (prevSearch.innerHTML === searchInput.value) {
            console.log("previousSearches", previousSearches);
            return;
          }
        }
      }
      const previousSearch = document.createElement("button");
      previousSearch.className = "previous-search";
      // add href to previousSearch to scroll to the group = of photos that have that same search
      previousSearch.innerHTML = searchInput.value || "corgis";
      previousSearchContainer.appendChild(previousSearch);

      const photosContainer = document.getElementById("photosContainer");
      data.results.forEach((photo, i) => {
        const photoContainer = document.createElement("div");
        photoContainer.className = "photo-container";

        const photoOverlayContainer = document.createElement("div");
        photoOverlayContainer.className = "photo-overlay-container";

        const photoOverlay = document.createElement("div");
        photoOverlay.className = "photo-overlay";

        const img = document.createElement("img");
        img.src = photo.urls?.small || "";
        img.alt = photo.alt_description || "Photo";
        img.className = "photo";
        photoOverlayContainer.appendChild(img);

        const description = document.createElement("div");
        description.innerHTML =
          photo.alt_description || "No description available";
        description.className = "photo-description";
        photoOverlayContainer.appendChild(description);
        photoContainer.appendChild(photoOverlayContainer);

        const credit = document.createElement("a");
        credit.href =
          photo.user.links && photo.user.links.html
            ? `${photo.user.links.html}?utm_source=portfolio_app&utm_medium=referral`
            : "#";
        credit.innerHTML = `Photo by <strong>${photo.user.name}</strong> on <strong>Unsplash</strong>`;
        credit.target = "_blank";
        credit.className = "photo-credit";
        photoContainer.appendChild(credit);

        photosContainer.appendChild(photoContainer);
      });
    })
    .catch((err) => console.error("Error:", err));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});
