class KureDatabase {
  idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  tables = [
    { name: 'product_category', keyPath: 'name' },
    { name: 'product_data', keyPath: 'variation_id', indexes: ['store_id', 'link', 'category_name', 'variation_id'] },
    { name: 'tokenworks', keyPath: 'customer_id' },
    { name: 'order', keyPath: 'order_id' },
    { name: 'order_item', keyPath: 'order_item_id' }
  ];

  databaseDefinition = {
    dbName: "kure-db",
    dbVer: 1,
  };

  currentTable = '';

  productData() {
    this.currentTable = 'product_data';
    return this;
  }

  connect = (db_definition) => {
    return new Promise((resolve, reject) => {
      // Opens a connection to the existing database or creates a new one
      const req = this.idb.open(db_definition.dbName, db_definition.dbVer);
      req.onsuccess = (ev) => {
        // Saves an instance of the connection to our custom object
        db_definition.dbCon = ev.target.result;
        resolve();
      }
      req.onupgradeneeded = (event) => {
        // Only fired once per db version, used to initialize the db
        db_definition.dbCon = event.target.result;
        db_definition.dbInit = 1;
        resolve();
      }
      req.onerror = (e) => {
        // Returns error event
        reject(e);
      }
    });
  }

  createTables = (db_definition) => {
    return new Promise((resolve, reject) => {
      // If not called through onupgradeneeded event, return.
      if (!db_definition.dbInit) {
        resolve(`[createDB] ${db_definition.dbName}, already initialized`)
      }
      this.tables.forEach(el => {
        // Creates the object store(table) and accepts keyPath (primary key).
        const objectStore = db_definition.dbCon.createObjectStore(el.name, { keyPath: el.keyPath });
        if (el.indexes) {
          el.indexes.forEach(index => {
            objectStore.createIndex(index, index, { unique: false });
          });
        }
        objectStore.transaction.oncomplete = (e) => {
          resolve(`[createTables] ${db_definition.dbName}, task finished`);
        }
        objectStore.transaction.onerror = (event) => {
          reject(`[createTables] ${db_definition.dbName}, ${event.request.errorCode}`);
        };
      });
    });
  }

  /**
   * We append data but we can also update it. Depends on if update_data is true or false.
   *
   * @param database_definition
   * @param store
   * @param key
   * @param new_data
   * @param update_data
   * @returns {Promise<unknown>}
   */
  appendData = (store, key, new_data, update_data = false) => {
    return new Promise((resolve, reject) => {
      // Request a transaction with readwrite.
      const trx = this.databaseDefinition.dbCon.transaction([store], "readwrite").objectStore(store);

      // Append new objects to store by mapping over the newData array of objects.
      new_data.map(el => {
        const exists = trx.get(el[key]);
        exists.onsuccess = function (e) {
          const id = Boolean(exists.result);
          // No data exists. Add new data.
          if (!id) {
            trx.add(el);
          } else {
            // Data exists. Update data, only if update_data is true.
            if (update_data) {
              trx.put(el);
            }
          }
        };

        exists.onerror = function (e) {
          console.log(e);
        };
      });
      // resolve(`[appendDB] -> ${store}, Task finished`);
    });
  };

  initializeDatabaseObjectStores = () => {
    return new Promise((resolve, reject) => {
      this.connect(this.databaseDefinition).then(() => {
        this.createTables(this.databaseDefinition).then((res) => {
          resolve(this);
        });
      });
    });
  };

  getCount() {
    const store_name = this.currentTable;
    return new Promise((resolve, reject) => {
      this.connect(this.databaseDefinition).then(() => {
        this.createTables(this.databaseDefinition).then((res) => {
          const trx = this.databaseDefinition.dbCon.transaction([store_name], "readonly").objectStore(store_name);
          const count = trx.count();
          count.onsuccess = function (e) {
            resolve(count.result);
          };
          count.onerror = function (e) {
            reject(e);
          };
        });
      });
    });
  }

  getFiltered(index_name, filter_val) {
    const store_name = this.currentTable;
    return new Promise((resolve, reject) => {
      this.connect(this.databaseDefinition).then(() => {
        this.createTables(this.databaseDefinition).then((res) => {
          const trx = this.databaseDefinition.dbCon.transaction([store_name], "readonly").objectStore(store_name);
          let filterIndex = trx.index(index_name);
          let request = filterIndex.getAll(filter_val);
          request.onsuccess = function () {
            if (request.result !== undefined) {
              resolve(request.result);
            } else {
              console.log("No data found.");
            }
          };
          request.onerror = function (e) {
            console.log(e);
          };
        });
      });
    });
  }

  /**
   * Check if given store has data.
   *
   * @param store
   * @returns {Promise<unknown>}
   */
  checkDataExistsOld = (store) => {
    return new Promise((resolve, reject) => {
      this.connect(this.databaseDefinition).then(() => {
        // Request a transaction with readwrite.
        const trx = this.databaseDefinition.dbCon.transaction([store], "readwrite").objectStore(store);
        // get all data.
        let all = trx.getAll();
        all.onsuccess = function (e) {
          let results_found = (all.result.length > 0);
          resolve(results_found);
        };
        all.onerror = function (e) {
          console.log(e);
        };
      });
    });
  };

  initData = {
    product_category: [
      { name: 'edibles' }
    ],
    product_data: [
      // {
      //   variation_id: 1001,
      //   name: 'Product A',
      //   stock: 100,
      //   retail_price: 100.00,
      //   category_name: "edibles"
      // },
      // {
      //   variation_id: 1002,
      //   name: 'Product B',
      //   stock: 100,
      //   retail_price: 100.00,
      //   category_name: "edibles"
      // },
    ],
    tokenworks: [
      {
        customer_id: 'Do7R2wPxNbZrBx1X3ME3JPJLGQUzR73BAfboZTNKS5WR4eLvd0',
        first_name: 'Joshua',
        last_name: 'Ramirez',
        scan_location: 'LakeMendocino',
        changed: Date.now()
      }
    ],
    order: [
      {
        order_id: 100,
        order_state: 'draft',
        order_adjustment: [{}],
        // After adjustments, the final total.
        order_total: 0,
        customer_id: 1057,
        cashier_id: 1057,
        store_id: 2,
        created: Date.now(),
        changed: Date.now(),
        completed: null,
      }
    ],
    order_item: [
      {
        order_item_id: 1,
        order_id: 100,
        product_id: 1001,
        variation_id: 1001,
        quantity: 1,
        title: 'Product A',
        retail_price: 100.00,
        adjustment: [
          {
            type: 'tax',
            id: 1,
            name: 'Tax',
            discount_type: 'percent',
            value: 10,
            total: 0,
          },
          // {
          //   type: 'shipping',
          //   id: 2,
          //   value: 10,
          //   discount_type: 'flat',
          //   name: 'Shipping',
          // },
          {
            type: 'discount',
            id: 3,
            value: 5,
            discount_type: 'percent',
            name: 'New year discount',
            total: 0,
          },
          {
            type: 'discount',
            id: 4,
            value: 4,
            discount_type: 'flat',
            name: 'Product of the day',
            total: 0,
          },
        ],
        // After adjustments, the final total.
        total: 0,
      },
      {
        order_item_id: 2,
        order_id: 100,
        product_id: 1001,
        variation_id: 1001,
        quantity: 1,
        title: 'Product A',
        retail_price: 100.00,
        adjustment: [
          {
            type: 'tax',
            id: 1,
            name: 'Tax',
            discount_type: 'percent',
            value: 10,
            total: 0
          },
          // {
          //   type: 'shipping',
          //   id: 2,
          //   value: 10,
          //   discount_type: 'flat',
          //   name: 'Shipping',
          // },
          {
            type: 'discount',
            id: 3,
            value: 5,
            discount_type: 'percent',
            name: 'New year discount',
            total: 0,
          },
        ],
        // After adjustments, the final total.
        subtotal: 0,
      },
    ],
    cart_totals: {
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      summary: [],
    },
  };
}

export { KureDatabase };