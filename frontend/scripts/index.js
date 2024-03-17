const addNewsForm = $("#news-form");
const newsTitle = $("#newsTitle");
const newsContent = $("#newsContent");
const newsImage = $("#newsImage");
const container = $("#newsContainer");
let news = [];
const getNew = async () => {
  try {
    const resposne = await axios.get(
      "http://localhost/news-project/backend/getNews.php"
    );
    news = resposne.data;
    container.html("");
    news.forEach((element) => {
      container.append(generateNew(element));
    });
  } catch (error) {}
};
getNew();
const generateNew = (element) => {
  const { id, title, description, news_image } = element;
  return `  <div class="card mb-3">
            <img
              src="${news_image}"
              class="card-img-top img-thumbnail-sm image-size"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">
                ${description}
              </p>
              <a href="#" class="btn btn-primary">Read More</a>
            </div>
          </div>`;
};
