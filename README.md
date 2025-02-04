# react-native-marquee-text-loop

Smooth marque text component for news, updates, and more!

## Installation

```sh
npm install react-native-marquee-text-loop
```

### Props:

| Name             | Default  | Required  | Description |
| ---------------- | -------- | -------- | -------------------------------------- |
| text | null | yes | The text to be displayed in the marquee. |
| speed | 1 | No | The speed of the scrolling text. Higher values make it move faster. |
| textStyles | {} | No | Custom styles for the text component. |


## Example

<div>
<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWhwdTN5OHBkamdheWF1Y2JlcDZkdHVoOTdlbG5qZXhnY2IzanJ1byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ytK7nWtV5vcUCZYWbw/giphy.gif" width="285" height="640"/>
</div>

## Usage

```js
import {MarqueeText} from "react-native-marquee-text-loop";

// ...

<MarqueeText
  speed={1}
  text="Marque text component for news, updates, and more!"
  textStyles={{
    fontSize: 14,
    fontWeight: 'bold',
  }}
/>

```

### Troubleshooting 
If you encounter issues related to react-native-reanimated, such as:

`Cannot find module 'react-native-reanimated' or its corresponding type declarations,` 

or

`ReanimatedError: Mismatch between JavaScript code version and Reanimated Babel plugin version`


#### Possible Fixes:

1. Ensure react-native-reanimated is installed in your project:
   ```
   npm install react-native-reanimated@latest
   ```

2. If using Reanimated in React Native CLI, add the Babel plugin to babel.config.js:
   ```
   module.exports = {
     presets: ['module:metro-react-native-babel-preset'],
     plugins: ['react-native-reanimated/plugin'],
   };
   ```
   
3. If you're using Expo, ensure the version of Reanimated is compatible with your Expo SDK:
   ```
   expo install react-native-reanimated
   ```
   
4. Restart the Metro bundler after making changes:   
   ```
   npm start -- --reset-cache
   ```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
