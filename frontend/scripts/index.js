const addNewsForm = $("#addNews");
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

const addNews = async () => {
  try {
    const newsForm = new FormData();
    newsForm.append("title", newsTitle.val());
    newsForm.append("description", newsContent.val());
    newsForm.append("news_image", $("#newsImage")[0].files[0]);
    const resposne = await axios.post(
      "http://localhost/news-project/backend/addNews.php",
      newsForm
    );
    console.log(resposne);
    getNew();
    newsTitle.val("");
    newsContent.val("");
    newsImage.val("");
  } catch (error) {
    console.log(error);
  }
};
addNewsForm.submit((e) => {
  e.preventDefault();
  addNews();
});
$(document).ready(function () {
  getNew();
});
