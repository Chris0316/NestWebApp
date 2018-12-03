import ChinaFlag from '../../assets/images/flags/China.png';
import JapanFlag from '../../assets/images/flags/Japan.png';
import KoreaFlag from '../../assets/images/flags/Korea.png';
import PhilippineFlag from '../../assets/images/flags/Philippine.png';
import USAFlag from '../../assets/images/flags/USA.png';
import EuropeFlag from '../../assets/images/flags/Europe.png';
import EarthFlag from '../../assets/images/flags/Earth.png';

const countryOpts = [{
  label: '中国',
  value: '0086',
  icon: ChinaFlag
}, {
  label: '菲律宾',
  value: '0063',
  icon: PhilippineFlag
}, {
  label: '日本',
  value: '0081',
  icon: JapanFlag
}, {
  label: '韩国',
  value: '0082',
  icon: KoreaFlag
}, {
  label: '美国',
  value: '0001',
  icon: USAFlag
}, {
  label: '欧洲',
  value: 'euro',
  icon: EuropeFlag
}, {
  label: '其他',
  value: 'others',
  icon: EarthFlag
}];

export default value => {
  if (value) {
    let arr = countryOpts.filter(item => {
      return value === item.value;
    });
    if (arr.length > 0) {
      return arr[0]
    } else {
      return null;
    }
  } else {
    return countryOpts;
  }
}
