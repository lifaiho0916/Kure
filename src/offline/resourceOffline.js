import * as React from "react";
import { KureDatabase } from "request/KureDatabase";

// How many per page?
const per_page = 12;

export function getOfflineResource(config = {}) {
  const database = new KureDatabase()

  /**
   * @returns {Promise<object>}
   */
  async function getCommerceProduct(category_name, page_number) {
    return new Promise(function (resolve, reject) {
      database.connect(database.databaseDefinition).then(() => {
        const database_definition = database.databaseDefinition;
        const table_name = 'product_data';
        let totalProducts;
        countProductDataByCategory(table_name, category_name).then(function (result) {
          totalProducts = result;
          let total_pages = Math.ceil(totalProducts / per_page);
          const tx = database_definition.dbCon.transaction([table_name], "readwrite");
          const objectStore = tx.objectStore(table_name);
          // let products_final = [];
          // let hasSkipped = false;
          let all = objectStore.getAll();

          all.onsuccess = (event) => {
            let cursor = event.target.result;
            // if (!hasSkipped && page_number > 0) {
            //   hasSkipped = true;
            //   cursor.advance(page_number);
            //   return;
            // }
            if (cursor && cursor.length) {
              const products = cursor.filter(el => el.category_name.toLowerCase() === category_name.toLowerCase())
              if (products) {
                resolve({products: products, pages: total_pages});
              }
              resolve({products: [], pages: total_pages});
            } else {
              resolve({products: [], pages: total_pages});
            }
          }

          tx.oncomplete = function () {
            database_definition.dbCon.close();
          };
        });
      });
    });
  }

  function countProductDataByCategory(table_name, filter_val) {
    return new Promise(function (resolve, reject) {
      database.connect(database.databaseDefinition).then(() => {
        const database_definition = database.databaseDefinition;
        let total_products = 0;
        const objectStore = database_definition.dbCon.transaction([table_name], "readwrite").objectStore(table_name);
        const cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
            if (cursor.value.category_name.toLowerCase() === filter_val.toLowerCase()) {
              total_products += 1;
            }
            cursor.continue();
          } else {
            resolve(total_products);
          }
        }
      });
    });
  }
  return {
    getCommerceProduct,
  };
}