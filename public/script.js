document.getElementById("getData").addEventListener("click", () => {
  fetch("http://localhost:5000/api/data")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.length === 0 || !data.results) {
        console.error("Invalid data format:", data);
        return;
      }
      const photosContainer = document.getElementById("photosContainer");
      data.results.forEach((photo, i) => {
        const photoContainer = document.createElement("div");
        photoContainer.className = "photo-container";
        const img = document.createElement("img");
        img.src = photo.urls?.small || "";
        img.alt = photo.alt_description || "Photo";
        img.className = "photo";
        photoContainer.appendChild(img);

        const description = document.createElement("p");
        description.innerHTML =
          photo.alt_description || "No description available";
        description.className = "photo-description";
        photoContainer.appendChild(description);

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
