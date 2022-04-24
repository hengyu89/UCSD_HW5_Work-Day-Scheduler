// variables
var timeDisplayEl = $('#currentDay');       // time display area 
var timeBlocksEl = $('.container');         // area for generating time zones.
var saveButton = $('.saveBtn');             // blue buttons to save all tasks. 
var taskInput = $('.input');                // text area of time zones.


var timeZone = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']; // 9 time zones
var taskList = ['','','','','','','','',''];
// var currentHour = moment().format("H"); // current hour.
var currentHour = 13; // for test, 1 pm.

// functions
// write time zones layout.
function writeTimeZone() {
    for (var i = 0; i < timeZone.length; i++) {
        var divEl = $('<div>');
        divEl.addClass('row time-block');
        var template = `
        <p class="hour"> ${timeZone[i]}</p>
        <input type="text" class="input" id="plan-input"/>
        <button class="saveBtn ${i}"><i class="fa fa-save"></i></button>`;
        divEl.append(template);
        timeBlocksEl.append(divEl);
    
        if ( currentHour > i+9) {
            divEl.children().eq(1).addClass("past");
        } else if ( currentHour == i+9) {
            divEl.children().eq(1).addClass("present");
        } else {
            divEl.children().eq(1).addClass("future");
        }
        $('.'+i).on('click', saveAllTask)
    }
}


// display the current date on the top.
function displayTime() {
    var rightNow = moment().format('dddd, MMMM Do');
    timeDisplayEl.text(rightNow);
}


// when click the "save" icon, all task will be saved to local storage.
function saveAllTask() {
    taskList = [];
    for (var i = 0; i < timeZone.length; i++) {
        var temporary = timeBlocksEl.children().eq(i).children().eq(1).val();
        taskList.push(temporary);
    }
    localStorage.setItem('Task List', JSON.stringify(taskList));
}


// write the tasks from local storage every time reloading the webpage
function init() {
    var storedTaskList = JSON.parse(localStorage.getItem('Task List'));
    if (storedTaskList !== null) {
        taskList = storedTaskList;
    }
    writeTasks()
}


// Write the tasks into each time zones.
function writeTasks() {
    for (var i = 0; i < taskList.length; i++) {
        var temporary = timeBlocksEl.children().eq(i).children().eq(1);
        temporary.val(taskList[i]);
    }
}

// active the functions
writeTimeZone();
init();
setInterval(displayTime, 1000);