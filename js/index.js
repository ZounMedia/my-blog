$(document).ready(function () {
  const blogService = new BlogAPI(
    "https://652ac66e4791d884f1fd583e.mockapi.io/api/posts"
  );
  blogService.init();
});
