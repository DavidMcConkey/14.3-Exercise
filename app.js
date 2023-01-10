const gifZone = $("#gif-area");
const Input = $("#search");

//utilizes ajax to find proper gif

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let column = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100",
    });
    column.append(newGif);
    gifZone.append(column);
  }
}

//Handles form submission

$("form").on("submit", async function (evt) {
  evt.preventDefault();

  let searchTerm = Input.val();
  Input.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  addGif(response.data);
});

//Used to remove gifs within the zone

$("#remove").on("click", function () {
  gifZone.empty();
});
