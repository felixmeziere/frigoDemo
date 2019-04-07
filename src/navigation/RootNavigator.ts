import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Results, Welcome } from 'screens';
import { WHITE } from 'services';

const AppNavigator = createStackNavigator(
  {
    Results: {
      navigationOptions: {
        headerTitle: 'Conseils',
      },
      screen: Results,
    },
    Welcome: {
      navigationOptions: {
        header: null,
      },
      screen: Welcome,
    },
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#192328',
      },
      headerTintColor: WHITE,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
