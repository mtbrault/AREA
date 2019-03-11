This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Api Documentation

* GET method :
	* /getUsers : Return all the user subscribed to the API.
	* /webhookFacebook : Test if the webhook is working
	* /about.json : Describe all the action/reaction.

* POST method :
	* /user/register : Use to register an user.
	* /user/login : Use to login an user.
	* /getToken : Send all services token of the user.
	* /setServiceToken : Set a token for a service of the user.
	* /convertToken : Return a token with a jwt decode.
	* /webhookFacebook : Enable the webhook for the facebook service.
	* /service/:serviceName/get/:content : Return all the action or reaction configured for a service.
	* /service/:serviceName/add/:content : Add an action or an reaction to a service.
	* /service/:serviceName/delete/:content : Delete an action or an reaction to a service
	* /offAllServices : Disconnect the user from all his services.