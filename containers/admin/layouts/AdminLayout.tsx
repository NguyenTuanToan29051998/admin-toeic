import React, {FC, ReactNode, useState} from 'react';
import Router, {useRouter} from 'next/router';
import {connect} from 'react-redux';
import {RootState} from '../../../redux/slices';
import {AppDispatch} from '../../../redux/store';
import {NavbarDTO, NavbarItem} from '../../../models/admin/LayoutDto';
import {
  bellIcon,
  checkCircleFillIcon,
  chevronDownIcon,
  circleInfoIcon,
  exclamationCircleIcon,
  fileBinaryIcon,
  magnifyingGlassIcon,
  plusIconBS,
} from '../../../public/static/icons';

interface Props {
  dispatch: AppDispatch;
  showSidebar: boolean;
  children: ReactNode;
}

interface DropdownProps {
  subMenu: Array<NavbarItem>;
  text: string;
  icon?: string;
  currentURL?: string;
}

const CheckActivePath = (name: string, url: string): boolean => {
  return url.includes(`/${name}/`) || url.includes(`/${name}`);
};

const DropDownMenuNav: FC<DropdownProps> = ({
  text,
  subMenu,
  icon,
  currentURL,
}: DropdownProps) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  return (
    <li
      className="flex flex-col"
      onClick={(): void => subMenu && setShow(!show)}>
      <div
        className={`relative flex flex-row justify-between items-center h-11 focus:outline-none hover:bg-primary-200 hover:text-white border-l-4 hover:cursor-pointer border-transparent hover:border-indigo-500 pr-6${
          show ? ' bg-primary-200 text-white' : ''
        }`}
        onClick={(): Promise<boolean> => router.replace(currentURL)}>
        <div className="flex flex-row">
          {icon && (
            <span className="inline-flex justify-center items-center ml-4">
              {fileBinaryIcon()}
            </span>
          )}
          <span className="ml-2 text-sm tracking-wide truncate">{text}</span>
        </div>

        {subMenu && (
          <span className={`text-sm ${show ? 'rotate-180' : 'rotate-0'}`}>
            {chevronDownIcon()}
          </span>
        )}
      </div>
      <div className="bg-secondary-200">
        {show &&
          subMenu &&
          subMenu.map((v, i) => {
            return (
              <a
                key={
                  'dropdown-item-' + text + '-' + v.name + '-' + i.toString()
                }
                href={v.link || '#'}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-primary-200 hover:text-white border-l-4 border-transparent hover:border-indigo-500 pr-6 pl-4">
                {v.icon && (
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className={'bi ' + v.icon} />
                  </span>
                )}
                <span className="ml-2 text-sm tracking-wide truncate">
                  {v.name}
                </span>
              </a>
            );
          })}
      </div>
    </li>
  );
};

const dataNavMenu: NavbarDTO = {
  items: [
    {name: 'Collection', href: '/collections'},
    {
      name: 'Bài thi',
      href: '/exampaper',
      subMenu: [
        {name: 'Bài thi đã Review'},
        {name: 'Bài thi chưa Review'},
        {name: 'Bài thi chưa làm'},
      ],
    },
    {name: 'Đề thi', href: '/exams'},
    {name: 'Cấu trúc đề thi'},
    {name: 'Khóa thi', href: '/executions'},
    {name: 'Quản lý Tags', href: '/tags'},
    {
      name: 'Câu hỏi',
      href: '/question',
    },
  ],
};

// TODO component element

const Container = (props: Props): JSX.Element => {
  const router = useRouter();
  const {dispatch, children} = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuggest, setShowSuggest] = useState<boolean>(false);
  const [numberSelected, setNumberSelected] = useState<number>(1);
  const [collectionName, setCollectionName] = useState<string>('');
  const [showCollections, setShowCollections] = useState<boolean>(false);

  // TODO create redux collections
  const [collections, setCollections] = useState([
    'Colection 1',
    'Colection 2',
    'Colection 3',
  ]);
  const handleLogout = async (): Promise<void> => {
    try {
      // dispatch(logout());
      await Router.replace('/admin/login');
    } catch (e) {
      toastr.error(e.message);
    }
  };

  const handleCreateCollection = (): void => {
    const collectionList = collections.push(collectionName);
    // setCollections(collectionList);
    setShowCollections(false);
  };

  const handleChooseCollection = (name): void => {
    setCollectionName(name);
    setShowCollections(!showCollections);
  };

  const handleCreateQuestion = (): void => {
    setShowModal(false);
    router.push('/questions');
  };

  return (
    <div className="h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center h-14 border-b">
        <div className="pl-5">Logo</div>
        <div className="flex flex-row pr-5 space-x-3 justify-between items-center">
          {/* {magnifyingGlassIcon}
          {circleInfoIcon}
          {bellIcon} */}
          <div className="flex flex-row space-x-1 justify-between items-center">
            <img
              className="w-8 rounded-full"
              src="https://clipground.com/images/img_avatar-png-2.png"
              alt="avt"
            />
            <span>Nguyễn Tuấn Toàn</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-screen">
        <div className="flex sm:flex-col sm:w-64 bg-secondary-700 border-r overflow-y-auto overflow-x-hidden">
          <div className="sm:py-8 sm:self-center p-1">
            <button className="flex fex-row items-center bg-primary-200 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded min-w-max">
              {plusIconBS('text-lg')}
              <span
                className="self-center sm:text-base text-xs"
                onClick={(): void => setShowModal(true)}>
                Tạo mới câu hỏi
              </span>
            </button>
          </div>
          <ul className="flex sm:flex-col flex-row sm:space-y-1 text-c-white overflow-x-auto overflow-y-hidden">
            {dataNavMenu.items.map((v, i) => {
              return (
                <DropDownMenuNav
                  key={`DropDownMenuNav-${i}`}
                  icon="bi-file-binary"
                  text={v.name}
                  subMenu={v.subMenu}
                  currentURL={v.href}
                />
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col grow items-center px-2 sm:px-0">
          {/*Menu link*/}
          {/*<div className="flex flex-row self-start space-x-2 text-sm text-c-gray ml-6">*/}
          {/*  {router.asPath*/}
          {/*    .split('/')*/}
          {/*    .filter(v => v !== '')*/}
          {/*    .map((v, i) => {*/}
          {/*      const len =*/}
          {/*        router.asPath.split('/').filter(v => v !== '').length - 1;*/}
          {/*      return (*/}
          {/*        <>*/}
          {/*          {i === len ? (*/}
          {/*            <span className="text-secondary-700">*/}
          {/*              {t(v === 'admin' ? 'dashboard' : v)}*/}
          {/*            </span>*/}
          {/*          ) : (*/}
          {/*            <>*/}
          {/*              <span>{t(v === 'admin' ? 'dashboard' : v)}</span>*/}
          {/*              <span>/</span>*/}
          {/*            </>*/}
          {/*          )}*/}
          {/*        </>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*</div>*/}
          {children}
        </div>
        {/*TODO component modal and fix responsive*/}
        <div className="max-w-2xl mx-auto relative">
          <div
            id="default-modal"
            data-modal-show="true"
            aria-hidden="true"
            className={`overflow-x-hidden overflow-y-auto fixed h-modal h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center ${
              showModal ? 'visible bg-gray-0000008c' : 'invisible'
            }`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto mx-auto mt-[10%]">
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                  <span className="text-base font-semibold">
                    Tạo mới câu hỏi
                  </span>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="default-modal"
                    onClick={(): void => setShowModal(false)}>
                    {/*TODO move to icon*/}
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <span className="font-medium text-base">Loại câu</span>
                  <div className="flex gap-3 mt-4 mb-5 md:mb-9 whitespace-nowrap overflow-x-auto pb-4">
                    <button
                      data-modal-toggle="default-modal"
                      type="button"
                      className={`flex gap-2 items-center text-sm px-5 py-2.5 font-medium leading-tight rounded-[4px] focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${
                        numberSelected === 1
                          ? 'bg-green-00BF6F'
                          : 'text-white-0A1B39 font-normal border border-gray-F7F7F7'
                      }`}
                      onClick={(): void => setNumberSelected(1)}>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`${
                            numberSelected === 1
                              ? 'text-white'
                              : 'text-white-0A1B39'
                          }`}>
                          Single choise
                        </span>
                        {numberSelected === 1
                          ? checkCircleFillIcon('text-lg text-white')
                          : ''}
                      </div>
                    </button>
                    <button
                      data-modal-toggle="default-modal"
                      type="button"
                      className={`flex gap-2 items-center text-sm px-5 py-2.5 font-medium leading-tight rounded-[4px] focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${
                        numberSelected === 2
                          ? 'bg-green-00BF6F'
                          : 'text-white-0A1B39 font-normal border border-gray-F7F7F7'
                      }`}
                      onClick={(): void => setNumberSelected(2)}>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`${
                            numberSelected === 2
                              ? 'text-white'
                              : 'text-white-0A1B39'
                          }`}>
                          Multiple choise
                        </span>
                        {numberSelected === 2
                          ? checkCircleFillIcon('text-lg text-white')
                          : ''}
                      </div>
                    </button>
                    <button
                      data-modal-toggle="default-modal"
                      type="button"
                      className={`flex gap-2 items-center text-sm px-5 py-2.5 font-medium leading-tight rounded-[4px] focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${
                        numberSelected === 3
                          ? 'bg-green-00BF6F'
                          : 'text-white-0A1B39 font-normal border border-gray-F7F7F7'
                      }`}
                      onClick={(): void => setNumberSelected(3)}>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`${
                            numberSelected === 3
                              ? 'text-white'
                              : 'text-white-0A1B39'
                          }`}>
                          Câu hỏi Nhóm
                        </span>
                        {numberSelected === 3
                          ? checkCircleFillIcon('text-lg text-white')
                          : ''}
                      </div>
                    </button>
                    <button
                      data-modal-toggle="default-modal"
                      type="button"
                      className={`flex gap-2 items-center text-sm px-5 py-2.5 font-medium leading-tight rounded-[4px] focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${
                        numberSelected === 4
                          ? 'bg-green-00BF6F'
                          : 'text-white-0A1B39 font-normal border border-gray-F7F7F7'
                      }`}
                      onClick={(): void => setNumberSelected(4)}>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`${
                            numberSelected === 4
                              ? 'text-white'
                              : 'text-white-0A1B39'
                          }`}>
                          Toeic
                        </span>
                        {numberSelected === 4
                          ? checkCircleFillIcon('text-lg text-white')
                          : ''}
                      </div>
                    </button>
                  </div>
                  <span className="font-medium text-base">
                    Lựa chọn collection
                  </span>
                  <div className="mt-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-5">
                        <div className="relative">
                          <div className="flex items-center border border-gray-E5E6EC focus:border-primary-200">
                            <input
                              className="text-black-595959 bg-white focus:outline-none font-medium rounded-sm text-sm px-4 py-2.5 inline-flex w-full"
                              value={collectionName}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ): void => setCollectionName(e.target.value)}
                            />
                            {chevronDownIcon(
                              'text-base px-4 hover:cursor-pointer',
                              () => setShowCollections(!showCollections),
                            )}
                          </div>
                          {showCollections && (
                            <div className="absolute w-full border-x-1 border-b bg-white z-10">
                              {collections.map(item => (
                                <div
                                  key={Math.random()}
                                  className="pl-3 py-2 hover:bg-green-00BF6F"
                                  onClick={(): void =>
                                    handleChooseCollection(item)
                                  }>
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {collectionName ? (
                          <>
                            <button
                              data-modal-toggle="default-modal"
                              type="button"
                              className="flex gap-2 items-center text-sm px-6 py-2.5 border-2 border-blue-1890FF text-white font-medium leading-tight rounded-r-[2px] hover:bg-blue-1890FF focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-1890FF"
                              onClick={handleCreateCollection}>
                              Lưu
                            </button>
                            <button
                              data-modal-toggle="default-modal"
                              type="button"
                              className="border border-gray-00000040 font-medium rounded-sm text-sm px-5 py-2 text-center"
                              onClick={(): void => setCollectionName('')}>
                              Hủy
                            </button>
                          </>
                        ) : (
                          <div className="inline-flex">
                            <a
                              className="group max-w-max relative mx-1 flex flex-col items-center justify-center rounded-full p-1 text-gray-500"
                              href="#">
                              {exclamationCircleIcon(
                                'text-blue-2F80ED text-lg',
                                () => setShowSuggest(true),
                                () => setShowSuggest(false),
                              )}
                              {showSuggest && (
                                <div className="absolute bottom-0 mb-6 origin-bottom rounded text-white transition-all duration-300 opacity-100">
                                  <div className="flex flex-col items-center mb-1">
                                    <div className="rounded bg-gray-900 p-2 text-sm shadow-lg w-72 h-20 leading-5">
                                      Bạn có thể lựa chọn các collections có sẵn
                                      hoặc tạo mới một collection bằng cách gõ
                                      tiếp vào dropdown list.
                                    </div>
                                    <div className="border border-x-8 border-solid border-x-transparent border-t-8 border-t-black"></div>
                                  </div>
                                </div>
                              )}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
                      id="dropdown">
                      <div className="px-4 py-3">
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block text-sm font-medium text-gray-900 truncate">
                          name@flowbite.com
                        </span>
                      </div>
                      <ul className="py-1" aria-labelledby="dropdown">
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            Earnings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="text-black-595959 border border-gray-00000040 font-medium rounded-sm text-sm px-5 py-2 text-center"
                    onClick={(): void => setShowModal(false)}>
                    Hủy
                  </button>
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="flex gap-2 items-center text-sm px-6 py-2.5 border-2 border-green-00BF6F text-white font-medium leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                    onClick={handleCreateQuestion}>
                    Tạo câu hỏi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminLayout = connect((state: RootState) => ({
  // loginUser: selectors.selectLoginUser(state),
  loginUser: {},
}))(Container);
