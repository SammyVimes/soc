/**
 * Created by Semyon on 26.03.2015.
 */

function Poller(key, data) {

    var maxSelectedUsers = data.maxPeople;
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
        var polls = data.polls;
        for (var i = 0; i < polls.length; i++) {
            var poll = polls[i];
            $polls.append(createPollView(poll));
        }
        var peopleContainer = $("#people");
        for (i = 0; i < data.people.length; i++) {
            var person = data.people[i];
            peopleContainer.append(createPersonView(person));
        }
    }

    this.sendData = function() {
        var data = {};
        var selectedPeople = [];
        var $peopleContainer = $("#people");
        var $peopleCheckboxes = $peopleContainer.find("input");
        $peopleCheckboxes.each(function(i, el) {
            if (el.checked) {
                selectedPeople.push($(el).attr("person-id"));
            }
        });
        if (selectedPeople.length < 1) {
            alert("Выберите хотя бы одного человека");
            return;
        }
        data.selectedPeople = selectedPeople;
        var $pollsContainer = $("#polls");
        var $polls = $pollsContainer.find(".poll");
        var pollsData = [];
        $polls.each(function(__n, el) {
            var $poll = $(el);
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
            pollsData.push({pollId: pollId, listData: listData});
        });
        alert("Будем считать, что информацию отправили. JSON смотри в консоли.");
        console.log("JSON to send: " + JSON.stringify(pollsData));
        //$.ajax(url: "&key=" + key);
    };

    displayPoll(data);

}

function clone(selector) {
    var $clone = $(selector).clone();
    return $clone.children(0);
}
