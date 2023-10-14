class BlogAPI {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Method to fetch blog posts
  fetchPosts() {
    return $.ajax({
      url: this.endpoint,
      method: "GET",
      dataType: "json",
    });
  }

  // Method to render blog posts
  renderPosts(posts) {
    console.log(posts);

    const $blogPostsDiv = $("#blog_posts");
    posts.forEach((post) => {
      // Dynamically create the paragraphs
      const paragraphsHTML = post.paragraphs
        .map((paragraph) => {
          return `<p class="card-text">${paragraph}</p>`;
        })
        .join(""); // join the array of paragraphs into a single string

      // Dynamically create the card
      const card = `
          <div class="card mb-4">
            <img class="card-img-top" src="${
              post.img_url
                ? post.img_url
                : "https://via.placeholder.com/750x300"
            }" alt="Card image cap" />
            <div class="card-body">
              <h2 class="card-title">${post.title}</h2>
${paragraphsHTML}              <a href="post.html?id=${
        post.id
      }" class="btn btn-primary">Read More &rarr;</a>
            </div>
            <div class="card-footer text-muted">
              Posted by <a href="#">${post.author}</a>
            </div>
          </div>
        `;
      $blogPostsDiv.append(card);
    });
  }

  // Method to initiate fetching and rendering
  init() {
    //ensure we only call the render posts on the index page. We don't want to make this call on the about, contact, or post pages
    if (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/")
    ) {
      this.fetchPosts().done((posts) => this.renderPosts(posts)); //after fetching, render the posts
    }
  }
}
