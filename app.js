$(function () {
    let edit = false;
    //console.log("jquery works");
    //this way, the card is only shown when there are results to show
    $('#task-result').hide();
    //Get tasks form db
    fetchTasks();

    //Search
    $('#search').keyup(function (e) {
        //Only when there is something (otherwise I get an error when the input is empty)
        if ($('#search').val()) {
            let search = $('#search').val();
            //console.log(search);

            //Send info to task-search
            $.ajax({
                url: './task-search.php',
                type: 'POST',
                data: {
                    search
                },
                success: function (response) {
                    //console.log(response);
                    //convert the response into a JSON object
                    let tasks = JSON.parse(response);
                    //console.log(tasks);

                    let template = "";
                    tasks.forEach(task => {
                        console.log(task);
                        template += `<li>${task.name}</li>`;
                    });

                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        } else {
            //only show when there are results
            $('#task-result').hide();
        }
    });

    //Add task
    $('#task-form').submit(function (e) {
        //console.log('submitted');
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()
        };
        //console.log(postData);
        //e.preventDefault();

        let url = (edit)? 'task-edit.php': 'task-add.php';
        edit = false; //Need to change it to the default value, it changes every time i click on the name of a task
        console.log(url);


        $.post(url, postData, function (response) {
            console.log(response);
            //update when adding a new task
            fetchTasks();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
    });

    //although it may not seem so, it is easier to have the id on the <tr>, because this way i can get easily all items in the row
    function fetchTasks() {
        //List tasks in db
        $.ajax({
            //Connect to task-list.php, and receive information
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                //convert string to json object
                let tasks = JSON.parse(response);
                let template = '';
                //Go through the json and fill the template
                tasks.forEach(task => {
                    template += `
                <tr taskId="${task.id}">
                    <td>${task.id}</td>
                    <td>
                        <a href="#" class="task-item">${task.name}</a></td>
                    <td>${task.description}</td>
                    
                    <td><button class="task-delete btn btn-danger">Delete</button></td>
                </tr>
                `
                });
                //Write the template
                $('#tasks').html(template);
            }
        })
    }

    
    $(document).on('click', '.task-delete', function () {
        if (confirm('Are you sure you want to delete it?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            //console.log(element);
            //console.log(id);

            $.post('task-delete.php', {
                id
            }, function (response) {
                fetchTasks();
            })
        }
    })

    $(document).on('click', '.task-item', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php', {id}, function (response) {
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
        });
    });

});