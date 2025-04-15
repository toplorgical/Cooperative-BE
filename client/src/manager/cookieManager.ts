import Cookies from "js-cookie";

class CookieManager {
  static save(name: "_tp_access_token", value: string) {
    Cookies.set(name, value, {
      secure: true,
      expires: 1000 * 60 * 60 * 24 * 7,
    });
  }
  static remove(name: "_tp_access_token") {
    Cookies.remove(name);
  }
  static get(name: "_tp_access_token") {
    return Cookies.get(name);
  }
}

export default CookieManager;
