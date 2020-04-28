from flask import Flask, render_template, session, request
from flask_restful import reqparse
from ast import literal_eval

app = Flask(__name__, static_folder='./static', template_folder='./templates')

app.config.update(TEMPLATES_AUTO_RELOAD=True)


def parse_arg_form_requests(arg, **kwargs):
    parse = reqparse.RequestParser()
    parse.add_argument(arg, **kwargs)
    args = parse.parse_args()
    return args[arg]

@app.route('/', methods=['GET'])
def home():
    return render_template(
    'index.html'
    )

@app.route('/LaunchGame', methods=['GET', 'POST'])
def Admin():
    if request.method == 'POST':
        # print(request.form)
        # # index = 0
        # print(parse_arg_form_requests('Questions'))
        # print(request.form.to_dict(flat=False))
        # i = 1
        # while str(i) in request.args:
        #     print(request.form[i])
        #     i += 1
        myQuestions = request.form['Questions'] #get AllQuestions
        myQuestions = literal_eval(myQuestions) #convert the request object from string to list
        print(type(myQuestions))
        print(myQuestions)

        # print('test')
        return("success")
    return render_template(
    'Launch.html'
    )

@app.route('/AppRoute', methods=['GET', 'POST']) # handle traffic with apps
def control():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000')

#useful modules
#picking -> method of database storage: can preserve classes
#www.MYURL/showcase.com#isFake?=True
