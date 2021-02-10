$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(({ users }) => {
    console.log(users);
    for(let user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

