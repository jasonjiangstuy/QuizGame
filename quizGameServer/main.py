from flask import Flask, render_template, session, request

app = Flask(__name__, static_folder='./static', template_folder='./templates')

app.config.update(TEMPLATES_AUTO_RELOAD=True)

@app.route('/', methods=['GET'])
def home():
    return render_template(
    'index.html'
    )

@app.route('/LaunchGame', methods=['GET', 'POST'])
def Admin():
    if request.method == 'POST':
        print(request.args)
        # index = 0
        print(request.args.to_dict(flat=False))
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
