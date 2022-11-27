import Router, {useRouter} from 'next/router';
import React, {FC, useState} from 'react';
import PaginationSection from '../../components/PaginationSection';
import {tailwindOnly} from '../../hocs/tailwindOnly';
import {plusIconBS, trash3Icon} from '../../public/static/icons';
import {NextPage} from 'next';
import {ExamList} from '../../models/admin/Exam';
import {SortDirection} from '../../models/Common';
import {ExamExecutionList} from '../../models/admin/ExamExecution';
import {examExecutionService, examService} from '../../services';
import {parseInt} from 'lodash';

interface Props {
  examExecution: ExamExecutionList;
  searchStr: string;
  sortDirection: SortDirection;
  pageNo: number;
  pageSize: number;
}

const Execution: NextPage<Props> = ({
  examExecution,
  searchStr,
  sortDirection,
  pageNo,
  pageSize,
}: Props) => {
  const router = useRouter();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [showModalCreateExecution, setShowModalCreateExecution] = useState<
    boolean
  >(false);
  // const executionList = [
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  //   {
  //     id: 'MK0001',
  //     name: 'Khóa 2022 - 1',
  //     describe:
  //       'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
  //     status: 'Đang mở',
  //     numberParticipants: '450',
  //   },
  // ];

  // const pageCount = Math.ceil(executionList.length / DEFAULT_PAGE_SIZE);

  return (
    <div className="container">
      <div className="bg-white py-4">
        <h4 className="flex text-center text-white-0A1B39 font-medium text-xl mb-4">
          Quản lý khóa thi
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
              />
              <button
                className="flex gap-2 items-center h-full btn px-6 py-3 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F absolute right-0"
                type="button"
                id="button-addon3">
                {/*TODO move to icon*/}
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
      <div className="bg-white mt-5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end p-4">
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
                      onClick={() => setShowModalCreateExecution(true)}>
                      Tạo mới khóa thi
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <table className="w-full text-sm text-left">
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
                    Mã khóa
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên Khóa thi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mô tả
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SL học viên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hoạt động
                  </th>
                </tr>
              </thead>
              <tbody>
                {(examExecution.data || []).map(item => (
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
                      className="px-6 py-4 font-medium dark:text-white whitespace-nowrap text-blue-1890FF">
                      {item.id}
                    </th>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="flex items-center gap-1.5 px-6 py-4">
                      <div className="w-1.5 h-1.5 bg-[#52C41A] rounded-full" />
                      <span>{item.status}</span>
                    </td>
                    {/*TODO api number participants*/}
                    <td className="px-6 py-4">{'numberParticipants'}</td>
                    <td className="px-6 py-4 text-right">
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
            <div className="flex justify-end my-5 mr-3">
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
                pageSize={examExecution.pageSize}
                pageCount={examExecution.totalPages}
                currentPage={examExecution.pageNo}
                setCurrentPage={async (number): Promise<void> => {
                  await router.push(
                    `/executions?searchStr=${searchStr}&sortDirection=${sortDirection}&pageNo=${number}&pageSize=${pageSize}`,
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/*TODO component modal and fix responsive*/}
        <div className="max-w-2xl mx-auto relative">
          <div
            id="default-modal"
            data-modal-show="true"
            aria-hidden="true"
            className={`overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center ${
              showModalCreateExecution
                ? 'visible bg-gray-0000008c'
                : 'invisible'
            }`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto mx-auto mt-[10%]">
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                  <span className="text-base font-semibold">
                    Tạo mới Khóa thi
                  </span>
                  {/* <span className="text-white-0A1B39 mt-4">
										Bạn có thể tạo mới các Collection của mình, để dễ quản lý câu hỏi, bài
										thi dễ dàng hơn
									</span> */}
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="default-modal"
                    onClick={(): void => setShowModalCreateExecution(false)}>
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
                <div className="bg-white">
                  <div className="max-w-3xl mx-auto mt-5 py-5 px-5 pr-16">
                    {/* <span>Bạn có thể tạo mới các Khóa thi của mình, để dễ quản lý đề thi, bài thi dễ dàng hơn</span> */}
                    <div className="flex gap-4 items-center my-6">
                      <span className="flex justify-end w-40">
                        Tên khóa thi:
                      </span>
                      <input
                        type="search"
                        className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-2 rounded-sm w-4/5"
                        placeholder="Nhập tên Khóa thi của bạn"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                      />
                    </div>
                    <div className="flex gap-4 items-center my-6">
                      <span className="flex justify-end w-40">Mô tả:</span>
                      <textarea className="p-2 resize rounded-sm border-2 outline-none w-4/5 h-20"></textarea>
                    </div>
                    <div className="flex gap-4 items-center mt-6 mb-8">
                      <span className="flex justify-end w-[140px]">
                        Trạng thái:
                      </span>
                      <div className="flex items-center">
                        <input
                          id="country-option-1"
                          type="radio"
                          name="countries"
                          value="USA"
                          className="h-4 w-4 border-gray-300 focus:ring-green-00BF6F"
                          aria-labelledby="country-option-1"
                          aria-describedby="country-option-1"
                          // checked
                        />
                        <label
                          htmlFor="country-option-1"
                          className="text-sm font-medium text-gray-900 ml-2 block">
                          Public
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="country-option-2"
                          type="radio"
                          name="countries"
                          value="Germany"
                          className="h-4 w-4 border-green-00BF6F  focus:ring-green-00BF6F"
                          aria-labelledby="country-option-2"
                          aria-describedby="country-option-2"
                        />
                        <label
                          htmlFor="country-option-2"
                          className="text-sm font-medium text-gray-900 ml-2 block">
                          Private
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="text-black-595959 border border-gray-00000040 font-medium rounded-sm text-sm px-5 py-2 text-center"
                    onClick={(): void => setShowModalCreateExecution(false)}>
                    Hủy
                  </button>
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="flex gap-2 items-center text-sm px-6 py-2.5 border-2 border-green-00BF6F text-white font-medium leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                    onClick={(): void => setShowModalCreateExecution(false)}>
                    Tạo khóa thi
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

Execution.getInitialProps = async ({query, res}): Promise<Props> => {
  const {searchStr, sortDirection, pageNo, pageSize} = query;

  let examExecution = {} as ExamExecutionList;
  try {
    examExecution = await examExecutionService.getExamExecutions(
      searchStr?.toString() || '',
      (sortDirection as SortDirection) || SortDirection.DESC,
      parseInt(pageNo?.toString()) || 1,
      parseInt(pageSize?.toString()) || 10,
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
    examExecution,
    searchStr: searchStr?.toString() || '',
    sortDirection: (sortDirection as SortDirection) || SortDirection.DESC,
    pageNo: parseInt(pageNo?.toString()) || 1,
    pageSize: parseInt(pageSize?.toString()) || 10,
  };
};

export default tailwindOnly(Execution);
