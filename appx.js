$(function () {
  const fetchMessages = (choice) => {
    $.ajax({
      url: 'http://msg-share-backend-production.up.railway.app/messages',
      method: 'GET',
      success: (data) => {
        $('#messages').empty();
        data.forEach((message) => {
          const li = $(`<li>${message.text}</li>`);
          if(choice===false){
              const copyBtn = $('<button class="copy-btnz"><i class="fa fa-copy"></i></button>');
              copyBtn.click(async () => {
                try {
                  await navigator.clipboard.writeText(message.text);
                  console.log('done');
                } catch (err) {
                  console.error('error: ', err);
                }
              });
              li.append(copyBtn);
          }
          else{
              const delBtn = $('<button class="copy-btnz"><i class="fa fa-trash"></i></button>');
              delBtn.click(async () => {
                try {
                  await $.ajax({
                    url: `http://msg-share-backend-production.up.railway.app/messages/${message._id}`,
                    method: 'DELETE',
                    success: () => {
                      console.log('deleted!');
                      li.empty().append($('<span>(deleted)</span>'));
                    },
                    error: (err) => {
                      console.error(err);
                    }
                  });
                } catch (err) {
                  console.error('error: ', err);
                }
              });
              li.append(delBtn);
          }
          $('#messages').append(li);
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  };
  fetchMessages(false);


  $('.reload-btnz').on('click', () => {    
    $('#message').val('');
    fetchMessages(false);
  });

  $('form').on('submit', (event) => {
    event.preventDefault();
    const message = $('#message').val();
    
    if(message.length === 0) return;
    if( message==='master$'){fetchMessages(true);return;}

    $.ajax({
      url: 'https://msg-share-backend-production.up.railway.app/messages',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({text: message}),
      success: () => {
        console.log('saved!');
        $('#message').val('');
        fetchMessages();
      },
      error: (err) => {
        console.error(err);
      }
    });
  });
});
