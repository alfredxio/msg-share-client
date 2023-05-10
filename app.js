$(document).ready(() => {
  const fetchMessages = () => {
    $.ajax({
      url: 'http://msg-share-backend-production.up.railway.app/messages',
      method: 'GET',
      success: (data) => {
        $('#messages').empty();
        data.forEach((message) => {
          const li = $(`<li>${message.text}</li>`);
          const copyBtn = $('<button class="copy-btn"><i class="fas fa-copy"></i></button>');
          copyBtn.click(async () => {
            try {
              await navigator.clipboard.writeText(message.text);
              console.log('done');
            } catch (err) {
              console.error('error: ', err);
            }
          });
          li.append(copyBtn);
          $('#messages').append(li);
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  };
  
  
  fetchMessages();
  
  $('form').submit((event) => {
    event.preventDefault();
    const message = $('#message').val();
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
