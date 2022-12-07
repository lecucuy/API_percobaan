//JQuery Library


$('.cari-button').on('click', function() {
    $.ajax({
        url : 'http://www.omdbapi.com/?apikey=cdfcb1d8&s=' + $('.input-keyword').val(),
        success: result => { //Callback 
            // console.log(result);
            const movies = result.Search;
            console.log(movies);
            let cards = '';
            movies.forEach(m => {
                cards += ShowCards(m);
                
            });
    
            $('.movies-container').html(cards);
    
            $('.modal-detail-button').on('click', function() {
                // console.log($(this).data('imdbid'));
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=cdfcb1d8&i='+ $(this).data('imdbid'),
                    success : m => {
                        console.log(m);
                                const modalMovies = showMovieDetails(m);
                            $('.modal-body').html(modalMovies);
                    },
                    error: (e) =>  {
                        console.log(e.responeText);
                    }
                });
            });
        },
        error: (e) =>  {
            console.log(e.responeText);
        }
    
    });
});



function ShowCards(m) {
   return `      <div class="col-md-3 my-4">
                            <div class="card">
                                <img src="${m.Poster}" class="card-img-top" alt="">
                                <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModals" data-imdbid="${m.imdbID}">Show Details</a>
                                </div>
                            </div>

                        </div>`
}


function showMovieDetails(m) {
     
        return `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <h4>${m.Title}</h4>
                        <li class="list-grup-item"><strong>Year :</strong>${m.Year}</li>
                        <li class="list-grup-item"><strong> Runtime : </strong>${m.Runtime}</li>
                        <li class="list-grup-item"><strong> Genre :</strong>${m.Genre}</li>
                        <li class="list-grup-item"><strong>Language : </strong>${m.Language}</li>
                    </ul>
                </div>
            </div>
        </div>`
}