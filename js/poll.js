/**
 * Created by Semyon on 26.03.2015.
 */

function Poller(key) {

    var progressModal = $("#progress-modal");
    function showProgressModal(message) {
        progressModal.openModal();
    }

    function hideProgressModal() {
        progressModal.closeModal();
    }

    var pendingRequest = null;
    function loadPoll() {
//        pendingRequest = $.ajax({url: url + "?key=" + encodeURI(key), contentType: "application/json", dataType: "json"})
        var deferred = $.Deferred();
        deferred.resolve({success: true, polls: mockResults, people: mockPeople, maxPeople: 3});
        deferred.promise().done(function(data) {
                if (data.success) {
                    displayPoll(data);
                } else {
                    //TODO: error handling
                }
            }, function(error) {

            }).always(function() {
                hideProgressModal();
            });
    }

    function createPersonView(person) {
        return $('<p><input type="checkbox" id="person' + person.id + '" /><label for="person' + person.id + '">' + person.name + '</label></p>');
    }

    function createListItem(listItem) {
        var $listItem = $("#list-item-template");
    }

    function createListView(list) {
        var $listView = clone("#list-template");
        var listItems = list.items;
        for (var i = 0; i < listItems.length; i++) {
            var listItem = listItems[i];
            $listView.append(createListItem(listItem));
        }
        return $listView;
    }

    function createPollView(poll) {
        var $poll = clone("#poll-template");
        var pollLists = poll.lists;
        for (var i = 0; i < pollLists.length; i++) {
            var list = pollLists[i];
            $poll.append(createListView(list));
        }

    }

    function displayPoll(data) {


        var peopleContainer = $("#people");
        for (i = 0; i < data.people.length; i++) {
            var person = data.people[i];
            peopleContainer.append(createPersonView(person));
        }
    }

    loadPoll();

}

function clone(selector) {
    return $(selector).clone();
}


var mockResults = [
    {
        title: "",
        lists: [
            {
                title: "",
                items: [{ title: "", id: ""}]
            }
        ]
    }
];

var mockPeople = [
    {id: "0", name: "Иванов Иван"}, {id: "1", name: "Петров Пётр"}
];