# vue-programmatic-invisible-google-recaptcha

A simple invisible Google reCAPTCHA component focused solely on programmatic invocation.

<p align="left">
  <a href="https://www.npmjs.com/package/vue-programmatic-invisible-google-recaptcha"><img src="https://img.shields.io/npm/v/vue-programmatic-invisible-google-recaptcha.svg" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/vue-programmatic-invisible-google-recaptcha"><img src="https://img.shields.io/npm/dm/vue-programmatic-invisible-google-recaptcha.svg" alt="NPM Downloads"></a>
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fpromosis%2Fvue-programmatic-invisible-google-recaptcha&text=Check%20out%20vue-programmatic-invisible-google-recaptcha%20on%20GitHub&via=promosis">
  <img src="https://img.shields.io/twitter/url/https/github.com/promosis/vue-programmatic-invisible-google-recaptcha.svg?style=social" alt="Tweet"></a>
</p>

### Demo

[View demo](https://promosis.github.io/vue-programmatic-invisible-google-recaptcha/)

[View on npm](https://www.npmjs.com/package/vue-programmatic-invisible-google-recaptcha)

[View on GitHub](https://github.com/promosis/vue-programmatic-invisible-google-recaptcha)

### Install

```
# npm
npm i vue-programmatic-invisible-google-recaptcha

# yarn
yarn add vue-programmatic-invisible-google-recaptcha
```

Or you can include it through the browser at the bottom of your page:

```html
<!-- Please note if you're using the browser method you're going to want to adjust the version number as needed. -->

<script src="https://unpkg.com/vue-programmatic-invisible-google-recaptcha@2.1.2/dist/vue-programmatic-invisible-google-recaptcha.min.js"></script>
```

### About

This is a simple component that helps deal with an invisible Google reCAPTCHA that you intend to invoke programmatically. There are a few plugins that help with Google's reCAPTCHA, but this one is focused on the invisble version with a programmatic invocation only. Due to its nature, reCAPTCHA can be a little complex - so that is what is driving the narrow scope here. Library supports easy multiple reCAPTCHAs on the same page.

Here's a breakdown of the steps you go through when using this library:
- Load the Google reCAPTCHA library using the provided `script` tag.
- Whenever you'd like, invoke the reCAPTCHA using `this.$refs.invisibleRecaptcha1.execute()` method (replacing `invisibleRecaptcha1` with the `ref` name you set).
- Google will either decide to show a challange or not. Either way, you'll get the `recaptchaToken` in the registered `recaptcha-callback` event. Make sure to register for that.
- Use that token to verify in your backend.
- Call the method again if you'd like to get a new token.

### Usage Example

```js
import VueProgrammaticInvisibleGoogleRecaptcha from 'vue-programmatic-invisible-google-recaptcha'
Vue.component('vue-programmatic-invisible-google-recaptcha', VueProgrammaticInvisibleGoogleRecaptcha)
```

```html
<!-- Put this in your base HTML file - I use Vue CLI 3 so I put it at the bottom of the ./public/index.html file. -->
<script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>

<!-- This is in the component you want to have the reCAPTCHA -->
<vue-programmatic-invisible-google-recaptcha
    ref="invisibleRecaptcha1"
    :sitekey="'<YOUR_SITEKEY_HERE>'"
    :elementId="'invisibleRecaptcha1'"
    :badgePosition="'left'"
    :showBadgeMobile="false"
    :showBadgeDesktop="true"
    @recaptcha-callback="recaptchaCallback"
></vue-programmatic-invisible-google-recaptcha>

<!-- Where you want to invoke the reCAPTCHA -->
submitButtonClicked() {
    // Do whatever you want here (probably some validation). After
    // that's done (or passed your expectations) you can then invoke the reCAPTCHA.
    this.$refs.invisibleRecaptcha1.execute()
},

<!-- The reCAPTCHA's registered callback. This is where you'll get your token. -->
recaptchaCallback (recaptchaToken) {
    // Use the `recaptchaToken` to pass to your backend to verify the token
    axios.post('/enter', {recaptchaToken: recaptchaToken}).then((result) => {
        console.log(result)
    })
},
```

Note - I find it to be a good idea to allow the user to reset their reCAPTCHA on their own if they're experiencing an issue. This component exposes a function for this. To do this, give them a button with the following code in the click function: `this.$refs.invisibleRecaptcha1.reset()`. This will reset the reCAPTCHA and hopefully get them passed the issue they're having.

### Props

| prop | type | description | required | default |
|---|---|---|---|---|
| ref | String | Unique String gives you control over the component | Yes |
| sitekey | String | Public key given to you by Google. | Yes |
| elementId | String | Unique String for the `id` of the element. Allows for multiple seperate reCAPTCHAs | Yes |
| badgePosition | String | Pass `'left'` to show badge on left side of screen. | No | `'right'` |
| showBadgeMobile | Boolean |`true` to show badge on mobile. `false` to hide badge on mobile. | No | `true`
| showBadgeDesktop | Boolean |`true` to show badge on desktop. `false` to hide badge on desktop. | No | `true`

### Methods

Note - call these methods through the `ref` you set up with your component. Example: `this.$refs.invisibleRecaptcha1.execute()`.

| method    | parameters  | description                    |
|---------|-------|--------------------------------|
| execute | none | Used to gather the token. If Google decides that the user needs to complete a test they'll do it here. |
| reset | none | Used to reset the reCAPTCHA instance. |

### Events

| event    | parameter value  | description                    |
|---------|-------|--------------------------------|
| recaptcha-callback | String | This even gets emitted when the token has been aquired. You can then use this token to verify the user on your backend. |

### Development

``` bash
# install dependencies
npm install

# serve with hot reload
npm run watch

# run the tests
npm run test

# build demo page
npm run build:example

# build library
npm run build:library

# build everything and run tests
npm run build
```

### Other

Go ahead and fork the project! Submit an issue if needed. Have fun!

### Thank You

Thanks to Google for their [reCAPTCHA](https://www.google.com/recaptcha) library.

### License

[MIT](http://opensource.org/licenses/MIT)

Packaged with a mixture of [vue-lib-template](https://github.com/biigpongsatorn/vue-lib-template) and [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup).