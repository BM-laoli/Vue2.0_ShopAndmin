import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Loading,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Notification,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step,
  InputNumber,
  CheckboxGroup,
  Checkbox,
  Upload,
  MenuItemGroup,
  Image,
  TimePicker,
  Drawer,
  DatePicker
} from 'element-ui'
import Vue from 'vue'
Vue.use(Upload)
Vue.use(Drawer)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Image)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(InputNumber)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Option)
Vue.use(Select)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification

