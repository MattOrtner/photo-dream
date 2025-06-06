const searchInput = document.getElementById("searchInput");
const previousSearchContainer = document.getElementById(
  "previousSearchContainer"
);
const previousSearches = document.getElementsByClassName("previous-search");

const isDuplicate = (search) => {
  if (previousSearches.length > 0) {
    for (let prevSearch of previousSearches) {
      if (prevSearch.innerHTML === searchInput.value) {
        return true;
      }
    }
  }
};
document.getElementById("searchButton").addEventListener("click", () => {
  if (isDuplicate(searchInput.value)) {
    console.log("Duplicate search");
    return;
  }
  fetch("/api/data?query=" + encodeURIComponent(searchInput.value))
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.total === 0 || !data.results) {
        console.log("No results found");
        return;
      }

      const previousSearch = document.createElement("a");
      previousSearch.className = "previous-search";
      previousSearch.innerHTML = searchInput.value || "easter egg";
      previousSearch.href = `#${searchInput.value}` || "#easter egg";
      previousSearchContainer.prepend(previousSearch);

      const photoGroupsContainer = document.getElementById(
        "photoGroupsContainer"
      );
      const photoGroup = document.createElement("div");
      photoGroup.className = "photo-group";
      photoGroup.id = `${searchInput.value}` || "easter egg";

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

        photoGroup.append(photoContainer);
      });

      photoGroupsContainer.prepend(photoGroup);

      const photoGroupHeader = document.createElement("h2");
      photoGroupHeader.className = "photo-group-header";
      photoGroupHeader.innerHTML = searchInput.value || "easter egg";
      photoGroup.prepend(photoGroupHeader);
      searchInput.value = "";
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
