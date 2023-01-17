import Routes from './routes';
import ThemeCustomization from './themes';
import { Resource } from "request/Resource";
import { useEffect, useState } from "react";
import { KureDatabase } from "request/KureDatabase";

const App = () => {
  const is_online = navigator.onLine;
  //const navigate = useNavigate();
  // useEffect(() => {
  //     resource.isLoggedIn()
  //         .then(() => {
  //             // navigate('/dashboard/default');
  //         })
  //         .catch(() => {
  //             navigate('/login');
  //         });
  // }, [navigate]);
  const resource = new Resource();
  const db = new KureDatabase();

  useEffect(() => {
    let pageCount = 0
    db.productData().count().then((count) => {
      if (!count) {
        resource.commerceProductDataSync({ page: 0 }).then((el) => {
          db.productData().put(el.data.rows).then((res) => {
            console.log(res);
          });

          for (let page = 1; page <= el.data.pager.total_pages; page++) {
            resource.commerceProductDataSync({ page: page }).then((el) => {
              db.productData().put(el.data.rows).then((res) => {
                console.log(res);
              });
              pageCount++;
              if (pageCount === el.data.pager.total_pages) {
                const channel = new BroadcastChannel('kure-app');
                channel.postMessage({ type: 'product_data', data: '', action: 'sync' });
              }
            });
          }
        })
      }
    });
  }, []);

  // /**
  //  * This isn't a perfect solution, but it's what will request a new token. The final solution should be based on
  //  * key presses and page changes. Make sure to only check if the app is online.
  //  */
  useEffect(() => {
    if (is_online) {
      if (localStorage.getItem('keep_me_signed_in') === 'true') {
        // resource.tokenRefresh().then((e) => {
        //   console.log(e);
        // });
      }
    }
  }, []);

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   // Listen for messages from the service worker using the BroadcastChannel API
  //   const channel = new BroadcastChannel('kure-app');
  //   channel.addEventListener('message', event => {
  //     console.log('Received message from service worker: ', event);
  //
  //     // Update the component's state with the data payload
  //     setData(event.data);
  //   });
  // }, []);

  return (
    <ThemeCustomization>
      <Routes/>
    </ThemeCustomization>
  );
};
export default App;
