import React, {ReactNode} from 'react';
import {NextComponentType} from 'next';
import {CustomNextPageContext} from './types';
import {selectors} from '../redux/slices/loginUserSlice';
import Router from 'next/router';

interface EveryoneWrapperProps {
  pageProps?: object;
}

export const everyone = (Content: NextComponentType): ReactNode => {
  const EveryoneWrapper: NextComponentType<
    CustomNextPageContext,
    {},
    EveryoneWrapperProps
  > = ({pageProps}: EveryoneWrapperProps) => {
    return (
      <div className="h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <Content {...pageProps} />
      </div>
    );
  };

  EveryoneWrapper.getInitialProps = async (
    ctx: CustomNextPageContext,
  ): Promise<object> => {
    const {req, res, store} = ctx;
    const isServer = !!req;
    const loginUser = selectors.selectLoginUser(store.getState());

    if (isServer) {
      if (loginUser) {
        res.writeHead(302, {Location: '/collections'});
        res.end();
        return;
      }
    } else {
      if (loginUser) {
        await Router.replace('/collections');
        return;
      }
    }

    return {
      pageProps: Content.getInitialProps
        ? await Content.getInitialProps(ctx)
        : {},
    };
  };

  return EveryoneWrapper;
};
