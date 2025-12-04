# Contributing
To contribute to the project, please create a fork of the repository and open a pull request.

# Setting up Development Environment

## Requirements
* Python 3.9 >=
* `python-venv` module
* `git`

# Cloning Repository
Clone the repository to a folder of your choice:

HTTP: `git clone https://github.com/tnmesh/homepage.git`
SSH: `git clone git@github.com:tnmesh/homepage.git`

# Setting up Python Virtual Environment
Create the virtual environment by running:

`python -m venv .` or `python3 -m venv .`

Then, load into the environment with
`source bin/activate`

Finally, install all python packages with
`pip install -r requirements.txt`

# Running MaterialDocs
Run with
`mkdocs serve`