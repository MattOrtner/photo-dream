document.getElementById("getData").addEventListener("click", () => {
  fetch("http://localhost:5000/api/data")
    .then((res) => {
      console.log("document response");
      return res.json();
    })
    .then((data) => {
      if (data.length === 0 || !data.results) {
        console.error("Invalid data format:", data);
        return;
      }
      const photosContainer = document.getElementById("photosContainer");
      const fragment = document.createDocumentFragment();
      data.results.forEach((photo) => {
        const photoContainer = document.createElement("div");

        const img = document.createElement("img");
        img.src = photo.urls?.small || "";
        img.alt = photo.alt_description || "Photo";
        img.className = "image";
        photoContainer.appendChild(img);

        const description = document.createElement("p");
        description.innerHTML =
          photo.alt_description || "No description available";
        description.className = "image-description";
        photoContainer.appendChild(description);

        const credit = document.createElement("a");
        credit.href =
          photo.user.links && photo.user.links.html
            ? `${photo.user.links.html}?utm_source=portfolio_app&utm_medium=referral`
            : "#";
        credit.innerHTML = `Photo by <strong>${photo.user.name}</strong> on <strong>Unsplash</strong>`;
        credit.target = "_blank";
        credit.className = "image-credit";
        photoContainer.appendChild(credit);

        fragment.appendChild(photoContainer);
      });
      photosContainer.appendChild(fragment);
    })
    .catch((err) => console.error("Error:", err));
});
// credit.innerHTML = `Photo by <a href="${photo.user.links.html}?utm_source=portfolio_app&utm_medium=referral">${photo.user.name}</a> on <a href="https://unsplash.com/?utm_source=portfolio_app&utm_medium=referral">Unsplash</a>`;
