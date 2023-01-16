class Resource {

  defaultConfig = {
    // Base URL of your Drupal site.
    base: 'https://kurereactjs.joshideas.com',
    // base: 'http://localhost/kuremendocino.com',
    // Name to use when storing the token in localStorage.
    token_name: 'drupal-oauth-token',
    // OAuth client ID - get from Drupal.
    client_id: 'c02d0901-cba4-44b0-9ec2-963bcd1a6a67',
    // OAuth client secret - set in Drupal.
    client_secret: '4420d1918bbcf7686defdf9560bb5087d20076de5f77b7cb4c3b40bf46ec428b',
    // Drupal user role related to this OAuth client.
    scope: 'kure_app',
    // Margin of time before the current token expires that we should force a
    // token refresh.
    expire_margin: 0,
    // User info storage name.
    user_info: 'drupal-user-info'
  };

  config;

  constructor(config = {}) {
    this.config = { ...this.defaultConfig, ...config };
  }

  /**
   * A magic function that will encode the base64 public key to array buffer which is needed by the subscription option.
   *
   * @param base64String
   * @returns {Uint8Array}
   */
  urlB64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  /**
   * @returns {Promise<object>}
   */
  async commerceProduct(category_name, parameters = {}) {
    return await this._fetch('/rest/commerce-products/front-page/2/' + category_name, parameters);
  }

  async commerceCategory(category_name, parameters = {}) {
    return await this._fetch('/rest/commerce-products/category/2/' + category_name, parameters);
  }

  async commerceProductDetail(variation_link, parameters = {}) {
    return await this._fetch('/rest/commerce-products/product-detail/' + variation_link, parameters);
  }

  async commerceProductDataSync(parameters = {}) {
    return await this._fetch('/rest/commerce-products/data-sync' + '', parameters);
  }

  /**
   * Cookie functionality is broken!
   */
  // async cookieLogin(username, password) {
  //   const header = { 'content-type': 'application/json' };
  //   const parameters = { _format: 'json' };
  //   const body = JSON.stringify({ name: username, pass: password });
  //   return await this._fetch('/user-login', parameters, body, header, 'POST', false);
  // }
  //
  // async sessionToken() {
  //   //const header = { 'content-type': 'application/json' };
  //   //const parameters = { _format: 'json' };
  //   //const body = JSON.stringify({ name: username, pass: password });
  //   return await this._fetch('/session/token', null, null, null, 'GET', false);
  // }
  //
  // async getMe() {
  //   const token = this.tokenCurrent();
  //   const header = {
  //     'content-type': 'application/json',
  //     'x-csrf-token': token.csrf_token,
  //     'session-token': token.session_token,
  //     'x-app-type': 'ReactJS'
  //   };
  //   console.log(header);
  //   const parameters = { _format: 'json' };
  //   //const body = JSON.stringify({ name: username, pass: password });
  //   return await this._fetch('/me', parameters, null, header, 'GET', false);
  // }

  /**
   * Exchange a username and password for an OAuth token.
   *
   * @param username
   * @param password
   * @returns {Promise<{data: string, statusText: string, status: number}>}
   */
  async login(username, password) {
    const form_data = new FormData();
    form_data.append('grant_type', 'password');
    form_data.append('client_id', this.config.client_id);
    form_data.append('client_secret', this.config.client_secret);
    form_data.append('scope', this.config.scope);
    form_data.append('username', username);
    form_data.append('password', password);
    return await this._fetch('/oauth/token', null, form_data, null, 'POST', false);
  }

  /**
   * Register a new user via a custom endpoint within Drupal.
   *
   * @param mail
   * @param username
   * @param password
   * @returns {Promise<{data: string, statusText: string, status: number}>}
   */
  async register(mail, username, password) {
    const form_data = new FormData();
    form_data.append('grant_type', 'password');
    form_data.append('client_id', this.config.client_id);
    form_data.append('client_secret', this.config.client_secret);
    form_data.append('scope', this.config.scope);
    form_data.append('mail', mail);
    form_data.append('username', username);
    form_data.append('password', password);

    return await this._fetch('/register-token', null, form_data, null, 'POST', false);
  }

  /**
   * To Drupal, send this user's data object (username, email, uid) and the subscription object - push API registration.
   *
   * @param user_data
   * @returns {Promise<void>}
   */
  async savePushMessagingSubscription(user_data) {
    console.log('saveSubscription');

    const applicationServerKey = this.urlB64ToUint8Array(
      "BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    // Get the pushManager object from the service worker registration
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe(options).then((subscription) => {
        const _data = JSON.stringify({
          user_data: user_data,
          subscription: subscription,
        });

        console.log(user_data);
        console.log(subscription);

        const headers = {
          'Content-Type': 'application/json',
        };
        return this._fetch('/web-push-device-registration', null, _data, headers, 'POST', true)
        .then((response) => {
          console.log(response);
        }).catch((response) => {
          console.log(response);
        });
      });
    });
  }

  /**
   * Start the user reset password process.
   *
   * @param mail
   * @returns {Promise<{data: string, statusText: string, status: number}>}
   */
  async passwordReset(mail) {
    let user_info = {
      name: mail,
      request_type: 'send_reset_email',
    };
    return await this._fetch('/first-rest-end-point', null, JSON.stringify(user_info), { 'Content-Type': 'application/json;charset=UTF-8' }, 'POST', false)
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((response) => {
      return Promise.reject(response);
    });
  }

  /**
   * Update the user's password. Requires the verification email which includes the parameters listed below.
   *
   * @param password
   * @param uid
   * @param hash
   * @param timestamp
   * @returns {Promise<{data: string, statusText: string, status: number}>}
   */
  async passwordUpdate(password, uid, hash, timestamp) {
    let data = {
      uid: uid,
      hash: hash,
      timestamp: timestamp,
      new_password: password,
      request_type: 'update_password',
    };
    return await this._fetch('/first-rest-end-point', null, JSON.stringify(data), { 'Content-Type': 'application/json;charset=UTF-8' }, 'POST', false)
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((response) => {
      return Promise.reject(response);
    });
  }

  async verifyUserEmail(uid, timestamp, hash) {
    let data = {
      uid: uid,
      hash: hash,
      timestamp: timestamp,
      request_type: 'new_user_verify',
    };

    const header = { 'Content-Type': 'application/json;charset=UTF-8', XAppType: 'ReactJS' };
    return await this._fetch('/first-rest-end-point', null, JSON.stringify(data), header, 'POST', false);
  }

  async saveTokenNewUserRegistered(uid, token) {
    let data = {
      uid: uid,
      token: token,
      request_type: 'save_user_token',
    };
    // return await this._fetch('/password-recovery', null, JSON.stringify(user_info), { 'Content-Type': 'application/json;charset=UTF-8' }, 'POST', false)
    return await this._fetch('/first-rest-end-point', null, JSON.stringify(data), { 'Content-Type': 'application/json;charset=UTF-8' }, 'POST', false)
    .then((response) => {
      console.log(response);
      return Promise.resolve(response);
    })
    .catch((response) => {
      console.log(response);
      return Promise.reject(response);
    });
  }

  /**
   * Log the current user out. It also kills the session within Drupal and removes the token from local storage.
   * Along with user data.
   *
   * @returns {Promise<{data: string, statusText: string, status: number}>}
   * @constructor
   */
  async userLogout() {
    const uid = this.userGetUid();
    return await this._fetch('/user/' + uid, null, null, null, 'POST', true)
    .then((e) => {
      // Delete our local copies as well now that Drupal has logged us out.
      localStorage.removeItem(this.config.token_name);
      localStorage.removeItem(this.config.user_info);
      // In case we need to update the UI.
      return Promise.resolve(e);
    });
  }

  /**
   * From local storage, get user's name.
   *
   * @returns {*|string}
   */
  userGetName() {
    const data = localStorage.getItem(this.config.user_info)
    if (data) {
      return JSON.parse(data).name;
    }
    return '';
  }

  /**
   * From local storage, get user's UID.
   *
   * @returns {*|string}
   */
  userGetUid() {
    const data = localStorage.getItem(this.config.user_info)
    if (data) {
      return JSON.parse(data).uid;
    }
    return '';
  }

  /**
   * Retrieve the user's profile data such as name, email, uid, etc.
   *
   * @returns {Promise<boolean>}
   */
  async userGetProfileData() {
    return await this._fetch('/me', null, null, null, 'GET', true);
  }

  /**
   * Store an OAuth token retrieved from Drupal in localStorage.
   *
   * @param {object} data
   * @returns {object}
   *   Returns the token with an additional expires_at property added.
   */
  oAuthTokenSave(data) {
    // Make a copy of data object.
    const token = { ...data };
    token.date = Math.floor(Date.now() / 1000);
    token.expires_at = token.date + token.expires_in;
    localStorage.setItem(this.config.token_name, JSON.stringify(token));
    return token;
  }

  /**
   * From local storage, get the current OAuth token if there is one.
   *
   * @returns object|boolean
   *   Returns the current token, or false.
   */
  tokenCurrent() {
    return localStorage.getItem(this.config.token_name) !== null ? JSON.parse(localStorage.getItem(this.config.token_name)) : false;
  }

  /**
   * Request a new token using a refresh_token.
   *
   * This function is smart about reusing requests for a refresh token. So it is
   * safe to call it multiple times in succession without having to worry about
   * whether a previous request is still processing.
   */
  async tokenRefresh() {
    const token = this.tokenCurrent();
    // if (!token) {
    //   await Promise.reject();
    // }
    // const { expires_at, refresh_token } = token;
    // if (expires_at - this.config.expire_margin < Date.now() / 1000) {
    //   // Note that the data in the request is different when getting a new token
    //   // via a refresh_token. grant_type = refresh_token, and do NOT include the
    //   // scope parameter in the request as it'll cause issues if you do.
    //   const form_data = new FormData();
    //   form_data.append('grant_type', 'refresh_token');
    //   form_data.append('client_id', this.config.client_id);
    //   form_data.append('client_secret', this.config.client_secret);
    //   form_data.append('refresh_token', refresh_token);
    //
    //   return await this._fetch('/oauth/token', null, form_data, null, 'POST', false);
    // }
    // return Promise.resolve(token);
    const { expires_at, refresh_token } = token;
    const form_data = new FormData();
    form_data.append('grant_type', 'refresh_token');
    form_data.append('client_id', this.config.client_id);
    form_data.append('client_secret', this.config.client_secret);
    form_data.append('refresh_token', refresh_token);

    return await this._fetch('/oauth/token', null, form_data, null, 'POST', false);
  }

  /**
   * We assume the user is logged in if they have a token in local storage.
   *
   * @returns {boolean}
   */
  isLoggedIn() {
    return (this.tokenCurrent());
  }

  async _fetch(resource_path, parameters = null, body = null, headers = null, method = 'GET', with_authentication = false) {
    if (parameters !== null) {
      resource_path += '?' + Object.keys(parameters).map((key) => {
        return `${key}=${encodeURIComponent(parameters[key])}`;
      }).join('&');
    }

    let response;
    let options = {
      method: method,
      headers: new Headers(),
    };
    // When using the Drupal REST API, we need to use Accept: 'application/vnd.api+json'. When resetting a user's
    // password, we need to use 'Content-Type': 'application/json;charset=UTF-8'.
    if (headers !== null) {
      for (const property in headers) {
        options.headers.append(property, headers[property]);
      }
    }

    if (body !== null) {
      options.body = body;
    }
    if (!with_authentication) {
      response = await this.fetchWithoutAuthentication(resource_path, options);
    } else {
      response = await this.fetchWithAuthentication(resource_path, options);
    }

    let _data = '';
    await response.json().then((data) => {
      _data = data;
    })
    .catch((error) => {
      _data = '';
    });

    let response_body = {
      status: response.status,
      statusText: response.statusText,
      data: _data,
    };

    switch (response.status) {
      case 200:
        return Promise.resolve(response_body);

      default:
        return Promise.reject(response_body);
    }
  }

  /**
   * Wrapper for fetch() that will attempt to add a Bearer token if present.
   *
   * @param {string} url URL to fetch.
   * @param {object} options Options for fetch().
   */
  async fetchWithAuthentication(url, options) {
    const oauthToken = await this.tokenCurrent();
    if (oauthToken) {
      options.headers.append('Authorization', `Bearer ${oauthToken.access_token}`);
    }
    console.log(`${this.config.base}${url}`);
    return await fetch(`${this.config.base}${url}`, options);
  }

  async fetchWithoutAuthentication(url, options) {
    console.log(`${this.config.base}${url}`);
    return await fetch(`${this.config.base}${url}`, options);
  }

  /**
   * Run a query to /oauth/debug and output the results to the console.
   */
  debug() {
    const headers = new Headers({
      Accept: 'application/vnd.api+json'
    });

    this.fetchWithAuthentication('/oauth/debug?_format=json', { headers })
    .then((response) => response.json())
    .then((data) => {
      console.log('debug', data);
    });
  }
}

export { Resource };
