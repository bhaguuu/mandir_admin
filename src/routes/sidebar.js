import DashBoard from '../assets/dashboard.png';
import User from '../assets/user.png';
import Evennts from '../assets/events.png';
import News from '../assets/news.png';
import Abput from '../assets/about.png';
import Content from '../assets/contnet.png';
import Ads from '../assets/advertisement.png';

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/',
    icon: <img className="mask w-6"  src={DashBoard} alt="dashboard"/>, 
    name: 'Dashboard',
  },
  {
    path: '/users', // url
    icon: <img className="mask w-6" src={User} alt="mandir logo"/>, // icon component
    name: 'Users Manager', // name that appear in Sidebar
  },
  {
    path: '/events', // url
    icon: <img className="mask w-6" src={Evennts} alt="mandir logo"/>, // icon component
    name: 'Events Manager', // name that appear in Sidebar
  },
  // {
  //   path: '/app/charts', // url
  //   icon: <ChartBarIcon className={iconClasses}/>, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  // },
  {
    path: '/news', // url
    icon: <img className="mask w-6" src={News} alt="mandir logo"/>, // icon component
    name: 'News Manager', // name that appear in Sidebar
  },
  {
    path: '/content', // url
    icon: <img className="mask w-6" src={Content} alt="mandir logo"/>, // icon component
    name: 'App Content', // name that appear in Sidebar
  },
  {
    path: '/ads', // url
    icon: <img className="mask w-6" src={Ads} alt="mandir logo"/>, // icon component
    name: 'Advertisment', // name that appear in Sidebar
  },
  {
    path: '/about', // url
    icon: <img className="mask w-6" src={Abput} alt="mandir logo"/>, // icon component
    name: 'About Us', // name that appear in Sidebar
  },
  // {
  //   path: '/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
  //   name: 'Calendar', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
  //       name: 'Login',
  //     },
  //     {
  //       path: '/register', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Register', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses}/>,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       path: '/app/blank',
  //       icon: <DocumentIcon className={submenuIconClasses}/>,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/app/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
  //       name: '404',
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Settings', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Profile', // name that appear in Sidebar
  //     },
  //   ]
  // },
  
]

export default routes


