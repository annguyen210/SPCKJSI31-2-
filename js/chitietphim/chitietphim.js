function getMovieDetails() {
    const params = new URLSearchParams(window.location.search);
    const movie_id = params.get("id");
    // load du lieu tu api
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVkZjRhYTJiYWI1MjIxZWE2OTBjNDVjODBhMzc3NSIsIm5iZiI6MTczNjUxNzEyMS41OTAwMDAyLCJzdWIiOiI2NzgxMjYwMTM0YTRlNzVlNDk3YjU1OTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B8JzunVnF_Pr2cSKc9qY7p3C2X-ChY-k3md-chsRrKU",
      },
    };
  
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((movie) => {
        console.log(movie);
        // load thong tin len html
        const movieDetail = document.getElementById("movie-detail");
        movieDetail.innerHTML = `  
        <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="${
          movie.title
        }">  
        <h2>${movie.title}</h2>  
        <p>Năm: ${movie.release_date}</p> 
        <p>Lượt xem: ⬆️ 500,000 views</p> 
        <p>Đánh giá: ${movie.vote_average}/ ${movie.vote_count} 
          <span style="color: gold;">${"★".repeat(5)}</span>
        </p>
        <p>Ngôn ngữ: Tiếng Anh</p>  
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
          movie.title
        }"> 
        <p>Tóm tắt: ${movie.overview}</p>  
        <p>Doanh thu: $${movie.budget}</p>  
        <p>Mức độ phổ biến: $${movie.popularity}</p>  
        <p>Thời lượng: ${movie.runtime} phút</p>
        <p><a href="${movie.homepage}" target="_blank">Homepage của phim</a></p>  
  
        <h3>6 bình luận</h3>
        <ul>
         <p>  @huskytv:    Phim hay ngoài mong đợi luôn! Diễn xuất của dàn diễn viên quá đỉnh 🥹👏</p>
         <p>  @annguyend:  Nội dung lôi cuốn từ đầu đến cuối, không có phút nào nhàm chán!</p>
         <p>  @123thoan:   Xem xong vẫn còn ám ảnh mấy ngày sau 😱 Quá xuất sắc!</p>
         <p>  @tdung763:   Nhạc phim và hình ảnh đều rất đầu tư. Mình cho 9/10!</p>
         <p>  @mtpsontung: Phim rất đáng để xem lại lần 2. Ai chưa xem thì đừng bỏ lỡ nha!</p>
         <p>  @mixigaming: Nội dung ổn, nhưng phần cuối hơi khó hiểu. Ai giải thích giúp với? </p>
        </ul>
    `;
      })
      .catch((err) => alert(err));
  }
  
  document.addEventListener("DOMContentLoaded", getMovieDetails);
  
  document.getElementById("back-button").addEventListener("click", function () {
    // Chuyển hướng về trang index
    window.location.href = "../index.html";
  });
  