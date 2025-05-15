const { createApi } = require("unsplash-js");

const unsplash = createApi({
  // missing accessKey
});

const fetchPhotos = async (query) => {
  console.log("fetchPhotos...");
  try {
    const response = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 10,
    });
    if (response.errors) {
      console.error("Error fetching photos:", response.errors);
      return [];
    }
    return response.response;
  } catch (error) {
    console.error("Error of fetchPhotos:", error);
    return [];
  }
};

const fetchRandomPhoto = async () => {
  try {
    const response = await unsplash.photos.getRandom({
      count: 1,
    });
    if (response.errors) {
      console.error("Error fetching random photo:", response.errors);
      return null;
    }
    return response.response[0];
  } catch (error) {
    console.error("Error fetching random photo:", error);
    return null;
  }
};

module.exports = {
  fetchPhotos,
  fetchRandomPhoto,
};
