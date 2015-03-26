/**
 * Created by Semyon on 26.03.2015.
 */

function login(loginListener, errorListener) {

    function hashLogin(hash) {
        finish(hash);
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
                    finish(value);
                    modal.closeModal(); //будет работать с ES6?
                } else {
                    alert("Введите ключ");
                }
            });
        }
        var modal = modalLoginBundle.modal;
        modal.openModal({dismissible: false});
    }

    function finish(key) {
        loadData(key);
    }

    var progressModal = $("#progress-modal");
    function showProgressModal(message) {
        progressModal.openModal();
    }

    function hideProgressModal() {
        progressModal.closeModal();
    }

    function loadData(key) {
        showProgressModal();
        $.ajax({url: "http://xomak.net/teambuilder/handler.php?action=login&key=" + encodeURI(key), contentType: "application/json", dataType: "json"}).done(function(data) {
//        var deferred = $.Deferred();
//        deferred.resolve({text: mockText, name: "Первак какой-то", success: true, poll: mockResults, people: mockPeople, maxPeople: 3});
//        deferred.promise().done(function(data) {
            hideProgressModal();
            if (data.success) {
                loginListener(key, data);
                var personName = data.name;
                $("#your-name").text("(" + personName + ")");
                $("#info").text(data.text);
                $("#info-modal").openModal();
            } else {
                errorListener(data.error);
            }
        }, function(error) {

        }).always(function() {
            hideProgressModal();
        });
    }

    var hash = window.location.hash;
    hash ? hashLogin(hash) : modalLogin();

}


var mockText = "Описание того что здесь происходит вообще";

var mockResults =
{
    id: 0,
    title: "Опрос для создания команды",
    lists: [
        {
            id: "0",
            title: "Цели",
            description: "Описание первого списка",
            items: [
                { title: "Цель1", id: "0", description: ""},
                { title: "Цель2", id: "1", description: ""},
                { title: "Цель3", id: "2", description: "Описание цели3"},
                { title: "Цель4", id: "3", description: ""}
            ]
        },
        {
            id: "1",
            title: "Инструменты",
            description: "Описание второго списка",
            items: [
                { title: "Инструмент1", id: "0", description: ""},
                { title: "Инструмент2", id: "1", description: ""},
                { title: "Инструмент3", id: "3", description: "Описание инструмента3"},
                { title: "Инструмент4", id: "4", description: "Описание инструмента4"},
                { title: "Инструмент5", id: "5", description: "Описание инструмента5"},
                { title: "Инструмент6", id: "6", description: ""}
            ]
        }
    ]
};

var mockPeople = [
    {id: "0", name: "Иванов Иван"}, {id: "1", name: "Петров Пётр"},
    {id: "2", name: "Иванов Иван"}, {id: "3", name: "Петров Пётр"},
    {id: "4", name: "Иванов Иван"}, {id: "5", name: "Петров Пётр"},
    {id: "6", name: "Иванов Иван"}, {id: "7", name: "Петров Пётр"}
];