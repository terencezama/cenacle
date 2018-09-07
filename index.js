import App from './src/app'
import { Navigation } from "react-native-navigation";

Navigation.registerComponent(`WelcomeScreen`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "WelcomeScreen"
      }
    }
  });
});