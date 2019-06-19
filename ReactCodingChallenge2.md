# Clinton Electronics Coding Challenge
Hello Jordan, congrats on making it to the next step: the Coding Challenge! This challenge consists of a real-world mini project which will give us a chance to evaluate your code style. We anticipate this challenge will take 6-8 hours to complete and is due by 5pm on Monday 6/24. When you are finished, please commit your code to a GitHub repository and email us the link.

Good Luck!

# React Coding Test

This challenge features a common piece of any web application - the User Account management form. As our web application is written in React, we're looking for a React component (or components) which allows a user to update their account information. 

Here are the requirements:

- Provide a set of React components representing a "User Account" page.
- Display the user's properties on the page.
- Provide a form to allow the user to edit their properties.
	- Users should not be able to edit their id.
- Include some validation on the form, which must validate before they are allowed to save their changes.
	- All fields are required.
	- Email must be in a valid format.
	- Users must be at least 18 years old.
- Provide a "Save Changes" button which calls a fake API endpoint.
	- Make an HTTP 'PUT' request to a fake API endpoint with PostBin, Hookbin, or something similar.
	- The Content-Type of this request should be 'application/json'.
	- The body of the request should be the updated user object.
- You must use React, but you may use any other libraries/modules you wish.
- While these are the only 'Requirements', we will be looking at overall front-end skills, so feel free to show us what you've got.

User Object
```
User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	jobTitle: string;
	birthday: string;
}
```
