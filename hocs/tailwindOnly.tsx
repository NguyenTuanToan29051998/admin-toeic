import React, {ReactNode} from 'react';
import {NextComponentType} from 'next';
import {CustomNextPageContext} from './types';
import {AdminLayout} from '../containers/admin/layouts/AdminLayout';
import {getBooleanCookieFromRequest} from '../utils/cookie';
import {getLoginUser, selectors} from '../redux/slices/loginUserSlice';
import Router, {useRouter} from 'next/router';
import {collectionService} from '../services';
import {SortDirection} from '../models/Common';
import {CollectionStatus} from '../models/admin/Collection';

const SHOW_SIDEBAR_COOKIE = 'showSidebar';

interface TailwindWrapperProps {
  showSidebar: boolean;
  pageProps?: object;
}

export const tailwindOnly = (Content: NextComponentType): ReactNode => {
  const TailwindWrapper: NextComponentType<
    CustomNextPageContext,
    TailwindWrapperProps,
    TailwindWrapperProps
  > = (props: TailwindWrapperProps): JSX.Element => {
    return (
      <AdminLayout showSidebar={props.showSidebar}>
        <Content {...props.pageProps} />
      </AdminLayout>
    );
  };

  TailwindWrapper.getInitialProps = async (
    ctx: CustomNextPageContext,
  ): Promise<TailwindWrapperProps> => {
    const {req, res, store} = ctx;
    const isServer = !!req;
    let showSidebar = true;

    // const loginUser = selectors.selectLoginUser(store.getState());
    // if (isServer) {
    //   showSidebar = getBooleanCookieFromRequest(SHOW_SIDEBAR_COOKIE, req, true);

    //   if (!loginUser) {
    //     // res.writeHead(302, {Location: '/'});
    //     // res.end();
    //     res.setHeader('Location', '/');
    //     res.statusCode = 302;
    //   }
    // } else {
    //   if (!loginUser) {
    //     await Router.replace('/');
    //     return;
    //   }
    // }

    return {
      showSidebar,
      pageProps: Content.getInitialProps
        ? await Content.getInitialProps(ctx)
        : undefined,
    };
  };

  return TailwindWrapper;
};
