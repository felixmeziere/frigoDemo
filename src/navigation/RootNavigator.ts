import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Welcome } from 'screens';

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
  },
});

export default createAppContainer(AppNavigator);
