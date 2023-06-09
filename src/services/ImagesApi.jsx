function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=32974369-6c6def824ede5ef73d1d6de36&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Something is wrong with fetching`));
  });
}

const api = {
  fetchImages,
};

export default api;
