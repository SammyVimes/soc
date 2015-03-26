/**
 * Created by Semyon on 26.03.2015.
 */

function login(loginListener) {

    function hashLogin(hash) {
        loginListener(hash);
    }

    var modalLoginBundle = null;
    function modalLogin() {
        if (!modalLoginBundle) {
            modalLoginBundle = {};
            modalLoginBundle.modal = $("#login-modal");
            modalLoginBundle.input = $("#key");
            $("#login-modal-ok").click(function() {
                var value = modalLoginBundle.input.val();
                if (value) {
                    loginListener(value);
                    modal.closeModal(); //будет работать с ES6?
                } else {
                    mAlert("Введите ключ");
                }
            });
        }
        var modal = modalLoginBundle.modal;
        modal.openModal();
    }

    var hash = window.location.hash;
    hash ? hashLogin(hash) : modalLogin();

}