$(function() {
    const $form = $('#payment-form');
    $form.submit(function(event) {
        // Отключим кнопку, чтобы предотвратить повторные клики
        $form.find('.submit').prop('disabled', true);

        // Запрашиваем token у Stripe
        Stripe.card.createToken($form, stripeResponseHandler);
        Stripe.bankAccount.createToken({
            country: 'US',
            currency: 'usd',
            routing_number: '110000000',
            account_number: '000123456789',
            account_holder_name: 'Jenny Rosen',
            account_holder_type: 'individual',
        }, stripeResponseHandler);

        // Запретим форме submit
        return false;
    });
});

function stripeResponseHandler(status, response) {
    // Получим форму:
    var $form = $('#payment-form');

    if (response.error) { // Problem!

        // Показываем ошибки в форме:
        $form.find('.payment-errors').text(response.error.message);
        $form.find('.submit').prop('disabled', false); // Разрешим submit

    } else { // Token был создан

        // Получаем token id:
        const token = response.id;

        // Вставим token в форму, чтобы при submit он пришел на сервер:
        let i = 1;
        $form.append($(`<input type="hidden" name="stripeToken"${i}>`).val(token));
        i++;

        console.log('$form.get(0) ', $form.get(0))
        $form.get(0).submit();
    }
}


// .gitignore .idea
// sequlize migtation
// seqlulize megration create  inse6trr defoult admin
// \sequlize db:migrate
//
// folder connections (db- connection)
//
// tdod moritoring





















