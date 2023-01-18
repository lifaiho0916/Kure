import * as idb from "idb";

class KureDatabase {
  db = null;
  databaseDefinition = {
    dbName: "kure-db",
    dbVer: 1,
  };

  currentTable = '';

  productData() {
    this.currentTable = 'product_data';
    return this;
  }

  storeData() {
    this.currentTable = 'activated_stores';
    return this;
  }

  async initialize() {
    this.db = await idb.openDB(this.databaseDefinition.dbName, this.databaseDefinition.dbVer, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        if (oldVersion == 0) {
          const tables = [
            { name: 'product_category', keyPath: 'name' },
            {
              name: 'product_data',
              keyPath: 'variation_id',
              indexes: ['store_id', 'link', 'category_name', 'variation_id']
            },
            { name: 'tokenworks', keyPath: 'customer_id' },
            { name: 'order', keyPath: 'order_id' },
            { name: 'order_item', keyPath: 'order_item_id' },
            { name: 'activated_stores', keyPath: 'store_id' }
          ];
          tables.forEach(el => {
            // Creates the object store(table) and accepts keyPath (primary key).
            const objectStore = db.createObjectStore(el.name, { keyPath: el.keyPath });
            if (el.indexes) {
              el.indexes.forEach(index => {
                objectStore.createIndex(index, index, { unique: false });
              });
            }
            objectStore.transaction.oncomplete = (e) => {
              console.log(`[createTables] ${db.name}, task finished`);
            }
            objectStore.transaction.onerror = (event) => {
              console.log(`[createTables] ${db.name}, ${event.request.errorCode}`);
            };
          });
        }
      },
      blocked(currentVersion, blockedVersion, event) {
      },
      blocking(currentVersion, blockedVersion, event) {
      },
      terminated() {
      },
    });
  }

  async count() {
    await this.initialize();
    try {
      return await this.db.count(this.currentTable);
    } catch (err) {
      console.log('error', err.message);
    }
  }

  async put(rows) {
    this.db = await idb.openDB(this.databaseDefinition.dbName, this.databaseDefinition.dbVer, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        if (oldVersion == 0) {
          const tables = [
            { name: 'product_category', keyPath: 'name' },
            {
              name: 'product_data',
              keyPath: 'variation_id',
              indexes: ['store_id', 'link', 'category_name', 'variation_id']
            },
            { name: 'tokenworks', keyPath: 'customer_id' },
            { name: 'order', keyPath: 'order_id' },
            { name: 'order_item', keyPath: 'order_item_id' }
          ];
          tables.forEach(el => {
            // Creates the object store(table) and accepts keyPath (primary key).
            const objectStore = db.createObjectStore(el.name, { keyPath: el.keyPath });
            if (el.indexes) {
              el.indexes.forEach(index => {
                objectStore.createIndex(index, index, { unique: false });
              });
            }
            objectStore.transaction.oncomplete = (e) => {
              console.log(`[createTables] ${db.name}, task finished`);
            }
            objectStore.transaction.onerror = (event) => {
              console.log(`[createTables] ${db.name}, ${event.request.errorCode}`);
            };
          });
        }
      },
      blocked(currentVersion, blockedVersion, event) {
      },
      blocking(currentVersion, blockedVersion, event) {
      },
      terminated() {
      },
    });
    try {
      let transaction = this.db.transaction(this.currentTable, 'readwrite');
      let object_store = transaction.objectStore(this.currentTable);
      rows.forEach(row => {
        object_store.put(row);
      });

      await transaction.complete;
    } catch (err) {
      console.log('error', err.message);
    }
  }

  async getAllFromIndex(index_name, key) {
    this.db = await idb.openDB(this.databaseDefinition.dbName, this.databaseDefinition.dbVer, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        if (oldVersion == 0) {
          const tables = [
            { name: 'product_category', keyPath: 'name' },
            {
              name: 'product_data',
              keyPath: 'variation_id',
              indexes: ['store_id', 'link', 'category_name', 'variation_id']
            },
            { name: 'tokenworks', keyPath: 'customer_id' },
            { name: 'order', keyPath: 'order_id' },
            { name: 'order_item', keyPath: 'order_item_id' }
          ];
          tables.forEach(el => {
            // Creates the object store(table) and accepts keyPath (primary key).
            const objectStore = db.createObjectStore(el.name, { keyPath: el.keyPath });
            if (el.indexes) {
              el.indexes.forEach(index => {
                objectStore.createIndex(index, index, { unique: false });
              });
            }
            objectStore.transaction.oncomplete = (e) => {
              console.log(`[createTables] ${db.name}, task finished`);
            }
            objectStore.transaction.onerror = (event) => {
              console.log(`[createTables] ${db.name}, ${event.request.errorCode}`);
            };
          });
        }
      },
      blocked(currentVersion, blockedVersion, event) {
      },
      blocking(currentVersion, blockedVersion, event) {
      },
      terminated() {
      },
    });
    try {
      return await this.db.getAllFromIndex(this.currentTable, index_name, key);
    } catch (err) {
      console.log('error', err.message);
    }
  }

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