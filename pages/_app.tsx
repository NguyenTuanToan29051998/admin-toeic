import React from 'react';
import {compose} from 'redux';
import {Provider} from 'react-redux';
import App, {AppContext} from 'next/app';
import withRedux, {ReduxWrapperAppProps} from 'next-redux-wrapper';
import {nprogress} from '../hocs/nprogress';
import {CustomNextPageContext} from '../hocs/types';
import {makeStore} from '../redux/store';
import {RootState} from '../redux/slices';
import '../scss/index.scss';
import {getCookieFromRequest} from '../utils/cookie';
import {ACCESS_TOKEN_COOKIE} from '../gateways/AuthGateway';
import {authService} from '../services';
import {getLoginUser} from '../redux/slices/loginUserSlice';
import Cookies from 'js-cookie';

interface CustomNextAppContext extends AppContext {
  ctx: CustomNextPageContext;
}

class ComposedApp extends App<ReduxWrapperAppProps<RootState>> {
  public static async getInitialProps(
    context: CustomNextAppContext,
  ): Promise<{pageProps: object}> {
    const {Component, ctx} = context;
    const isServer = !!ctx.req;

    if (isServer) {
      const jwt = getCookieFromRequest(ACCESS_TOKEN_COOKIE, ctx.req);
      if (jwt) {
        await authService.setAccessToken(jwt);
        const user = await ctx.store.dispatch(getLoginUser());

        // checkRole head
        // if (user && user.Role) {
        // res
        // }
      }
    } else {
      const jwt = Cookies.get(ACCESS_TOKEN_COOKIE);
      if (jwt) {
        await authService.setAccessToken(jwt);
        const user = await ctx.store.dispatch(getLoginUser());

        // checkRole head
        // if (user && user.Role) {
        // router
        // }
      }
    }

    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  public render(): JSX.Element {
    const {Component, pageProps, store} = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default compose(
  nprogress(300, {showSpinner: true}),
  withRedux(makeStore),
)(ComposedApp);
