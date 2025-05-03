// load movies by api --------------------------------------------------
function displayMovies() {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    // lay du lieu tu api
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVkZjRhYTJiYWI1MjIxZWE2OTBjNDVjODBhMzc3NSIsIm5iZiI6MTczNjUxNzEyMS41OTAwMDAyLCJzdWIiOiI2NzgxMjYwMTM0YTRlNzVlNDk3YjU1OTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B8JzunVnF_Pr2cSKc9qY7p3C2X-ChY-k3md-chsRrKU",
      },
    };
  
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json()) // chuyển dữ liệu từ json sang object
      .then((data) => {
        // dua du lieu len giao dien
        const movies = data.results;
        movies.forEach((movie) => {
          const movieDiv = document.createElement("div");
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `  
              <img src="https://image.tmdb.org/t/p/w500/${
                movie.backdrop_path
              }" alt="${movie.original_title}">  
              <h2>${movie.original_title}</h2>  
              <p>Năm: ${movie.release_date}</p>  
             
      
              <button onclick="showbuyfilm('${encodeURIComponent(
                movie.id
              )}')">Đặt vé phim tại đây📝 </button>
              
               <button onclick="showDetails('${encodeURIComponent(
                movie.id
              )}')">Xem chi tiết phim </button>  

              

      
              
          `;
          movieList.appendChild(movieDiv);
        });
      })
      .catch((error) => console.log(error));
  }
  


   function showbuyfilm(id) {
    window.location.href = `./html/buyfilm.html?id=${id}`;
  }

  function showDetails(id) {
    window.location.href = `./html/detail.html?id=${id}`;
  }
  
  document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    // lay danh sach cac card movie tu html (neu khong chua ki tu search => an)
    const movie_cards = document.querySelectorAll(".movie");
    movie_cards.forEach((card) => {
      const title = card.querySelector("h2").innerText.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
  
  // Hiển thị tất cả phim ban đầu
  displayMovies();