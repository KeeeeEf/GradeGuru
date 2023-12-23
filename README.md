
# GradeGuru
Track and manage your academic grades with ease.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## About
GradeGuru is a web application designed to help students keep track of their academic performance. It provides a convenient way to organize course information, input grades, and calculate semester GPAs.

## Features
- Add and view courses for each semester.
- Input and update grades for midterms and finals.
- Automatically calculate and display GPA for each semester.
- User-friendly interface for easy navigation and data entry.

## Getting Started
### Prerequisites
- Node.js installed
- npm (Node Package Manager) installed
- XAMPP installed (for running a local server)
	- MySQL module installed and running
	- Apache module installed (for managing phpMyAdmin and database)

### Installation
1. Clone the repository:
`git clone https://github.com/KeeeeEf/GradeGuru.git` 
3. Navigate to the `api` directory, install dependencies, and start the server:
	```
	cd GradeGuru/api
	npm install
	npm start
	```
4. Navigate to the `client` directory, install dependencies, and start the client:
	```
	cd GradeGuru/client
	npm install
	npm start
	```
5. Open XAMPP and enable the MySQL and Apache modules
6. Open phpMyAdmin (usually at http://localhost/phpmyadmin/) and import the MySQL database with the provided SQL file (`gradeguru.sql`).

## Usage
1. Access GradeGuru through your web browser.
2. Create a new semester by selecting a semester and inputting a year.
3. Add courses by providing a course name, number of units, as well as the types of activities and their weights for that given course.
4. Click on the newly created course card to input activities and scores for the midterm and final grades.
5. Return to the homepage to view the calculated GPA for each semester.
