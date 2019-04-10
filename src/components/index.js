import NestModal from './commons/NestModal'
import NestCheck from './commons/NestCheck'
import NestRadio from './commons/NestRadio'
import NestPreview from './commons/NestPreview'
import NestRange from './commons/NestRange'
import NestSelect from './commons/NestSelect'
import NestUpload from './commons/NestUpload'
import NestSwitch from './commons/NestSwitch'
import NestField from './commons/NestField'
import NestButton from './commons/NestButton'
import NestCalendar from './commons/NestCalendar'
import NestSwipeCell from './commons/NestSwipeCell'
import NestTabBar from './commons/NestTabBar'
import NestTabItem from './commons/NestTabItem'
import NestTabContainer from './commons/NestTabContainer'
import NestTabContainerItem from './commons/NestTabContainerItem'
import NestScroll from './commons/NestScroll'
import NestShare from './commons/NestShare'

import NestNav from './public/NestNav'
import Country from './public/Country'
import Language from './public/Language'

import NestToast from './commons/NestToast'

let components = {
  NestModal,
  NestCheck,
  NestRadio,
  NestPreview,
  NestRange,
  NestSelect,
  NestUpload,
  NestSwitch,
  NestField,
  NestButton,
  NestCalendar,
  NestSwipeCell,
  NestTabBar,
  NestTabItem,
  NestTabContainer,
  NestTabContainerItem,
  NestScroll,
  NestShare,
  NestNav,
  Country,
  Language
};

let install = function (Vue) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  });
  Vue.prototype.$toast = NestToast;
  Vue.prototype.$keepAlives = [];
}

export default { install };
