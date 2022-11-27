import Router, {useRouter} from 'next/router';
import React, {useRef, useState} from 'react';
import PaginationSection from '../../components/PaginationSection';
import {tailwindOnly} from '../../hocs/tailwindOnly';
import {plusIconBS, trash3Icon} from '../../public/static/icons';
import {CollectionList, CollectionStatus} from '../../models/admin/Collection';
import {collectionService} from '../../services';
import {SortDirection} from '../../models/Common';
import {NextPage} from 'next';
import {parseInt} from 'lodash';

export const MIDDLE_PAGE_NUMBER = 5;

interface Props {
  collections: CollectionList;
  searchStr: string;
  sortDirection: SortDirection;
  pageNo: number;
  pageSize: number;
  status: CollectionStatus;
}

const IndexPage: NextPage<Props> = ({
  collections,
  searchStr,
  sortDirection,
  pageNo,
  pageSize,
  status,
}: Props) => {
  const router = useRouter();

  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-screen bg-[#F0F4FA]">
      <div className="bg-white pt-4">
        <h4 className="flex text-center text-white-0A1B39 font-medium text-xl mb-4">
          Quản lý Collection
        </h4>
        <div className="flex justify-center">
          <div className="mb-3 w-full xl:w-[35rem] md:w-[30rem]">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm"
                placeholder="Nhập nội dung tìm kiếm"
                aria-label="Search"
                aria-describedby="button-addon3"
                ref={ref}
              />
              <button
                className="flex gap-2 items-center h-full btn px-6 py-3 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F absolute right-0"
                type="button"
                id="button-addon3"
                onClick={async () => {
                  await router.push(
                    `/collections?searchStr=${ref.current.value}&sortDirection=${sortDirection}&pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`,
                  );
                }}>
                <svg
                  className="w-5 h-5 text-white dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"></path>
                </svg>
                <span className="text-base">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:p-6">
        <div className="bg-white pb-5">
          <div className="relative">
            <div className="flex justify-end py-4 md:p-4">
              <div className="flex gap-3 mt-4">
                <button
                  className="flex gap-2 items-center h-full btn px-6 py-1.5 text-gray-00000040 border-gray-00000040 border-1 hover:border-red-FF4D4F hover:text-red-FF4D4F font-medium text-xs leading-tight rounded-sm focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white-F5F5F5"
                  type="button"
                  id="button-addon3">
                  <span className="flex gap-1 items-center">
                    {trash3Icon('text-base')}
                    <span className="text-base">Xóa</span>
                  </span>
                </button>
                <button
                  className="flex gap-2 items-center h-full btn px-6 py-1.5 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                  type="button">
                  <span className="flex gap-1 items-center">
                    {plusIconBS('text-2xl')}
                    <span
                      className="text-base"
                      onClick={async (): Promise<void> => {
                        await router.push('/collections/create');
                      }}>
                      Tạo mới Collection
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto whitespace-nowrap">
              <table className="w-full text-sm text-left">
                {/*TODO create data for header*/}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-1890FF dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onClick={(): void => setCheckedAll(!checkedAll)}
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tên Collection
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ảnh
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mô tả
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Thời gian tạo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hoạt động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(collections.data || []).map(item => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={Math.random()}>
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-1890FF dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            // checked={checkedAll}
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium dark:text-white whitespace-nowrap text-blue-1890FF w-[84px]">
                        <p className="w-[90px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {item.id}
                        </p>
                      </th>
                      {/* <td className="px-6 py-4">{item.id}</td> */}
                      <td className="px-6 py-4 w-[240px]">{item.title}</td>
                      <td className="px-6 py-4 w-[90px]">
                        <img className="w-8 h-8" src={item.avatar} alt="" />
                      </td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4 w-[120px]">Level 1</td>
                      <td className="px-6 py-4 w-[150px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-red-FF4D4F rounded-full" />
                          <span>{item.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 w-[200px]">
                        2021-02-05 08:28:36
                      </td>
                      <td className="px-6 py-4 text-right w-[130px]">
                        <div className="flex gap-2">
                          <a
                            href="#"
                            className="font-normal text-blue-1890FF hover:underline">
                            Xem
                          </a>
                          <a
                            href="#"
                            className="font-normal text-blue-1890FF hover:underline">
                            Sửa
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end my-5 md:mr-3">
              {/* {postList
                .slice(
                  (currentPage - 1) * DEFAULT_PAGE_SIZE,
                  (currentPage - 1) * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE,
                )
                .map(item => (
                  <tr>
                    <td className="ps-4">{item.item}</td>
                  </tr>
                ))} */}
              <PaginationSection
                pageSize={collections.pageSize}
                pageCount={collections.totalPages}
                currentPage={collections.pageNo}
                setCurrentPage={async (number): Promise<void> => {
                  await router.push(
                    `/collections?searchStr=${searchStr}&sortDirection=${sortDirection}&pageNo=${number}&pageSize=${pageSize}&status=${status}`,
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IndexPage.getInitialProps = async ({query, res}): Promise<Props> => {
  const {searchStr, sortDirection, pageNo, pageSize, status} = query;
  let collections = {} as CollectionList;
  try {
    collections = await collectionService.getCollection(
      searchStr?.toString() || '',
      (sortDirection as SortDirection) || SortDirection.DESC,
      parseInt(pageNo?.toString()) || 1,
      parseInt(pageSize?.toString()) || 10,
      (status as CollectionStatus) || CollectionStatus.DRAFT,
    );
  } catch (e) {
    if (res) {
      res.setHeader('Location', '/');
      res.statusCode = 302;
    } else {
      Router.push('/');
    }
  }

  return {
    collections,
    searchStr: searchStr?.toString() || '',
    sortDirection: (sortDirection as SortDirection) || SortDirection.DESC,
    pageNo: parseInt(pageNo?.toString()) || 1,
    pageSize: parseInt(pageSize?.toString()) || 10,
    status: (status as CollectionStatus) || CollectionStatus.DRAFT,
  };
};

export default tailwindOnly(IndexPage);
