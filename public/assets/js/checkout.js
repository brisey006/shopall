Stripe.setPublishableKey('pk_test_Vj5wRiSK3nnTN3hzxvOkAWvB00Gm2W8NIz');

var $form = $('#checkout-form');

$form.submit(function(event) {
  ('#charge-error').addClass('hidden');
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#cvc').val(),
    exp_month: $('#expiry-month').val(),
    exp_year: $('#expiry-year').val(),
    name: $('#name').val()
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) {
    //Show Errors on the Form
    ('#charge-error').text(response.error.message);
    ('#charge-error').removeClass('hidden');
    $form.find('button').prop('disabled', false)
  }
  else {
    //Get the Token ID
    var token = response.id;

    //Insets token into form submisiion
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    //Submit the Form
    $form.get(0).submit();
  }
}
