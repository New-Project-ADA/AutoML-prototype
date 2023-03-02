# AutoML-prototype
# Django-React

AutoML prototype using Django as backend and ReactJS as frontend

### Features
* Data Input
* Monitor

## Backend Setup
Python using 3.7+ version
1. Clone this repository: `git clone https://github.com/New-Project-ADA/AutoML-prototype.git`.
2. Create a virutal environment `python -m venv env`
3. Activate the virtual environment, go to the env/Scripts and type `activate`
4. Go to the main directory (this directory)
5. install all the requirements.txt `pip install requirements.txt`
6. Change the current directory to `backend` folder
7. Run `python manage.py makemigrations`.
8. Run `python manage.py migrate`.
9. Create a superuser: `python manage.py createsuperuser`
10. Run the server: `python manage.py runserver`.
11. You can visit backend site at `localhost:8000/api/datainput/` (as the main input for backend)

### All backend URLs
* admin/
* api/datainput/
* api/monitor/area/<int:id>/<str:area>/<str:start_date>/<str:end_date>
* api/features/<int:id>
* api/all_dates/<int:id>
* api/monitor/corr/<int:id>
* api/monitor/plot_fitur/<int:id>/<str:target_date>/<str:fitur>
* api/monitor/plot_risk/<int:id>/<str:target_date>
* api/monitor/confusion_matrix/<int:id>/<str:target_date>
* api/monitor/uncertainty/<int:id>/<str:target_date>
* api/monitor/stats/<int:id>/<str:area>/<str:start_date>/<str:end_date>

## Frontend Setup
1. Go to the frontend directory
2. Install the all frontend dependencies using npm: `npm install`.
3. Run the server: `npm start`.
4. Visit `localhost:3000`

You can visit the existing data using this
* `localhost:3000/monitor/<id>`
* all the id:
    * 1
    * 2
    * 3

---
**NOTE**
Make sure you running all backend and frontend to run this project.

---