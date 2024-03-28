import privateAxios from "./privateAxios";
import { saveUser, removeUser } from "../redux/features/userSlice";
import store from "../redux/app/store";

export function SetPrivateAxiosRespon() {
  const interceptor = privateAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Reject promise if usual error
      if (
        error.response.data.status !== 401 &&
        error.response.data.status !== 403
      ) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response.
       *
       * Must be re-attached later on or the token refresh will only happen once
       */
      privateAxios.interceptors.response.eject(interceptor);

      return privateAxios
        .post(
          "/api/refresh_token"
          // , {
          //     refresh_token: this._getToken("refresh_token"),
          // }
        )
        .then((response) => {
          saveUser(response.data);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return privateAxios(error.response.config);
        })
        .catch((error2) => {
          // console.log("error2:" + error2);
          // Retry failed, clean up and reject the promise
          store.dispatch(removeUser());
          return Promise.reject(error2);
        })
        .finally(SetPrivateAxiosRespon); // Re-attach the interceptor by running the method
    }
  );
}

export function SetPrivateAxiosRequest() {
  privateAxios.interceptors.request.use((config) => {
    // console.log('Request:', config)
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      const token = user.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}
