function answerChoice(question, letter) {
    return (`<input class='formItems' data-question='` + question.toString() + `' type='radio' id='` + letter + `' name='` + 'answerChoice ' + question.toString() + `' value=` + letter + `><label for='` + question.toString() + letter + `'> <input data-question='` + question.toString() + `' class='formItems' data-type='ACinput' name='` + letter + `' type='text' placeholder="` + letter + `"></input> </label>`)
}

function broken() {
    alert('page broken the page will reload')
    location.reload()
}

$(document).ready(function() {
    var question = 0
    $('#addNewQuestion').click(function() {
        question += 1
        if (question % 40 == 0) {
            alert('Thats a lot of questions, just gotta check that your not a bot')

        }
        // console.log(question.toString())
        $('#questionContainer').append(
            '<br><p>Question&nbsp;</p>' + question.toString() + '&nbsp' + `
<input data-starting='` + question.toString() + `' type="text" class='formHeaders' name='` + 'question ' + question.toString() + `' placeholder="What is your question?"/>` +
            answerChoice(question, 'A') +
            answerChoice(question, 'B') +
            answerChoice(question, 'C') +
            answerChoice(question, 'D')
        )
    })

    $('#removeQuestion').click(function(){
      console.log('test');
      var $container = $('#questionContainer');
      var currentQs = $container.html();
      // console.log(currentQs);
      var n = currentQs.lastIndexOf('<br');
      console.log(n);
      // console.log($container.slice(0, n));
      $container.html($container.html().slice(0, n));
      if (question > 0){
        question -= 1;
      }
    })

    $('#submit').click(function() {
        var AllQuestions = [];
        var onequestion = []
        var mainquestion
        $('.formHeaders').each(function() { // itterate through each question
            // console.log(this.value);
            var thisQuestion = this.getAttribute('data-starting') // Get what question we are going through
            onequestion.push(this.value)

            if (this.value && this.value != '') {
                //append question to main list as item 1
                var mainquestion = thisQuestion
            } else {
                alert(this.name + ' must be filled out')
                throw new Error('stop')
            }
            console.log(this.name, this.value);
            // console.log(AllQuestions);
            // if (this.name == 'data-starting'){
            //   if (this.value && this.value != ''){
            //     console.log(AllQuestions[AllQuestions.length - 1].unshift(this.getAttribute('data-starting')));//get the question input for each question number
            //     console.log(AllQuestions)
            //find the question info
            // console.log('test');
            let counter = 0
            let stopper = true
            var ACs = []
            $('.formItems').each(function() {
                // console.log('test');
                // console.log(counter);
                if (this.getAttribute('data-question') == thisQuestion) {
                    if (this.getAttribute('type') == 'radio') { // check the checked answer

                        counter += 1;
                        if (this.checked == true) {
                            ACs.push(this.id)
                            stopper = false;
                        }
                        if (counter >= 4 && stopper) {
                            alert('question ' + thisQuestion + ' must have a correct question');
                            throw new Error('stop')
                        }
                    }
                    // console.log('test');
                    var questionGroup = [];
                     if (this.getAttribute('data-type') == 'ACinput') { // get the other AC's
                       // console.log(this);

                       if (this.value != '' && this.value) {
                           questionGroup.push(this.value)
                           if (this.name != '' && this.name) {
                               questionGroup.unshift(this.name);
                           } else {
                             // debugger
                               broken();
                           }

                       } else {
                           alert('question ' + thisQuestion + '\'s answer choice ' + this.id + '\'s must be filled out');
                           throw new Error('stop')

                       }
                        // console.log(this.tagName);
                        // console.log('test');
                        ACs.push([questionGroup])
                        // console.log(onequestion);
                    }
                    // debugger
                    }

            })
            // else{
            //   broken()
            // }

            onequestion.push(mainquestion)
            onequestion.push(ACs);
            AllQuestions.push([onequestion])
        })
        console.log(AllQuestions);

        // make ajax request
        var fd = new FormData();

        AllQuestions.forEach((item, i) => {
          //item is a single:
          console.log(item);
          let questionHead = item[0][0]
          console.log(item[0][1]);
          let questionAC = item[1].unshift(item[0][1])
          console.log(questinHead);
          console.log(questionAC);
          fd.append(questionHead, questionAC);


        });
        if (question > 0) {


        $.ajax({
          type: 'POST',
          url: '/LaunchGame',
          data: fd,
          processData: false,
          contentType: false,
          success: function(data) {
            if (data == 'success'){
              alert('Game is a GO!, reloading the page');
              window.location.reload(true);
            }else {
              alert(data);
            }
          },
          error: function(e){
            console.log(e);
          }

        })
      }

    })



})

function disable() { //take list and disables every item

}
