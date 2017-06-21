import { TabNavigator } from 'react-navigation'
import Finance               from '../containers/modules/finance'
import Home                  from '../containers/modules/home'
import Mine                  from '../containers/modules/mine'

const RouteConfigs = 
{
    Home: { screen: Home },
    Finance: { screen: Finance },
    Mine: { screen: Mine },
}

const TabNavigatorConfig = {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition:   'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled:     false, // 是否可以左右滑动切换tab
    tabBarOptions:    {
      activeTintColor:   '#d81e06',// 文字和图片选中颜色
      inactiveTintColor: '#2c2c2c', // 文字和图片未选中颜色
      showIcon:          true, // android 默认不显示 icon, 需要设置为 true 才会显示
      showLabel:         true,
      // lazy:              true,
      swipeEnabled:      true,
      indicatorStyle:    {
        height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      tabStyle:{
        backgroundColor: 'orange'
      },
      style: {
         backgroundColor: '#FFFFFF', // TabBar 背景色
      },
      tabStyle:{
        tintColor: 'red'
      },
      labelStyle: {
         // fontSize: 15, // 文字大小
      },
      // pressOpacity: 1,
    },
    navigationOptions:{
      headerTintColor: 'blue',
    }
  
};
const TabBars = TabNavigator(RouteConfigs,TabNavigatorConfig)
export default TabBars

