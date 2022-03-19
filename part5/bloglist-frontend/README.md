# bloglist-frontend

## Features

- Login in frontend
  - Handling login
  - Sending token to backend
  - Saving the token to the browser's `localStorage`
- `props.children` and `PropTypes`
  - The children components, aka. `props.children`
  - Reference to components with `ref` (`useRef`, `forwardRef`, `useImperativeHandle`)
  - `PropTypes`
  - ESLint
- Testing React apps (Jest)
  - Rendering the component for tests
  - Running tests
  - Test file location
  - Searching for content in a component
  - Debugging tests (`screen.debug()`)
  - Clicking buttons in tests
  - Testing for CSS
  - Testing forms
  - About querying elements
  - Test coverage
- End to end testing
  - Cypress
  - Writing to a form
  - Some thins to note (querying hidden elements, like with `display: none`, using ids in the components)
  - Controlling the state of the database
  - Bypassing the UI ("Fully test the login flow, but only once!")

## Running

Run `npm start`.

## Testing

Using `cypress` ui: `npm run cypress:open`; or without it: `npm run test:e2e`.

Frontend and backend servers should be running, together with a local MongoDB (see README.md for the backend).
