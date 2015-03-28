/**
 * Created by Semyon on 26.03.2015.
 */

function Poller(key, data) {

    var maxSelectedUsers = data.maxPeople;
    var minSelectedUsers = data.minPeople ? data.minPeople : 0;
    var curSelected = 0;

    function createPersonView(person) {
        var id = person.id;
        var $personView = $('<p><input type="checkbox" person-id="' + id + '"  id="person' + id + '" /><label for="person' + id + '">' + person.name + '</label></p>');
        $personView.find("input").change(function() {
            var $this = $(this);
            var isChecked = $this.is(":checked");
            if (curSelected == maxSelectedUsers && isChecked) {
                alert("Нельзя выбрать больше чем " + maxSelectedUsers);
                $this.attr("checked", false);
                return;
            }
            if (isChecked) {
                curSelected++;
            } else {
                curSelected--;
            }
        });
        return $personView;
    }

    function createListItem(listItem) {
        var $listItem = clone("#list-item-template");
        $listItem.find(".item-id").val(listItem.id);
        $listItem.find(".list-item-title").text(listItem.title);
        if (listItem.description) {
            $listItem.find(".list-item-description").text(listItem.description);
        } else {
            $listItem.find(".list-item-description").addClass("hidden");
        }
        return $listItem;
    }

    function createListView(list) {
        var $listView = clone("#list-template");
        var $listItemsSection = $listView.find(".items");
        $listView.find(".list-header").text(list.title);
        $listView.find(".list-description").text(list.description);
        $listView.find(".list-id").val(list.id);
        var listItems = list.items;
        for (var i = 0; i < listItems.length; i++) {
            var listItem = listItems[i];
            $listItemsSection.append(createListItem(listItem));
            $listItemsSection.sortable();
            $listItemsSection.disableSelection();
        }
        return $listView;
    }

    function createPollView(poll) {
        var $poll = clone("#poll-template");
        var $pollListSection = $poll.find(".lists");
        $poll.find(".poll-header").text(poll.title);
        $poll.find(".poll-id").val(poll.id);
        var pollLists = poll.lists;
        for (var i = 0; i < pollLists.length; i++) {
            var list = pollLists[i];
            $pollListSection.append(createListView(list));
        }
        return $poll;
    }

    function displayPoll(data) {
        var $polls = $("#polls");
        var poll = data.poll;
        $polls.append(createPollView(poll));
        var peopleContainer = $("#people");
        for (var i = 0; i < data.people.length; i++) {
            var person = data.people[i];
            peopleContainer.append(createPersonView(person));
        }
    }

    this.sendData = function() {
        var selectedPeople = [];
        var $peopleContainer = $("#people");
        var $peopleCheckboxes = $peopleContainer.find("input");
        $peopleCheckboxes.each(function(i, el) {
            if (el.checked) {
                selectedPeople.push($(el).attr("person-id"));
            }
        });
        if (selectedPeople.length < minSelectedUsers) {
            alert("Выберите хотя бы одного человека");
            return;
        }
        var $pollsContainer = $("#polls");
        var $poll = $pollsContainer.find(".poll");

        var pollId = $poll.find(".poll-id").val();
        var $lists = $poll.find(".poll-list");
        var listData = [];
        $lists.each(function(__m, list) {
            var $list = $(list);
            var listId = $list.find(".list-id").val();
            var items = [];
            var $listItems = $list.find(".item-id");
            for (var i = 0; i < $listItems.length; i++) {
                items.push($listItems[i].value);
            }
            listData.push({listId: listId, listItems: items});
        });
        var dataToSend  = {pollId: pollId, listData: listData, selectedPeople: selectedPeople};
        console.log("JSON to send: " + JSON.stringify(dataToSend));
        $.ajax({
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "http://xomak.net/teambuilder/handler.php",
            data: JSON.stringify({key: key, action: "postData", data: dataToSend})
        }).done(function(data) {
            if (data.success) {
                alert("Информация отправлена.");
            } else {
                alert("Ошибка: " + data.error);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Ошибка: " + textStatus);
        }).always(function() {
            hideProgressModal();
        });
    };

    displayPoll(data);

    var progressModal = $("#progress-modal");
    function showProgressModal(message) {
        progressModal.openModal();
    }

    function hideProgressModal() {
        progressModal.closeModal();
    }

}

function clone(selector) {
    var $clone = $(selector).clone();
    return $clone.children(0);
}