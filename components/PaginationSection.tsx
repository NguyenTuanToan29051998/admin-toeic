import React from 'react';
import {FC} from 'react';
import {chevronLeftIcon, chevronRightIconBS} from '../public/static/icons';

interface Props {
  pageCount: number;
  currentPage: number;
  pageSize: number;
  setCurrentPage: (n: number) => Promise<void>;
}

const PaginationSection: FC<Props> = ({
  pageCount,
  currentPage,
  pageSize,
  setCurrentPage,
}: Props) => {
  const handleBack = async (): Promise<void> => {
    await setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  };

  const handlePage = async (page): Promise<void> => {
    await setCurrentPage(page);
  };

  return (
    <div className="flex">
      <div
        className="grid border px-2 w-8 h-8 items-center justify-center mr-2 rounded-sm"
        onClick={handleBack}>
        {chevronLeftIcon('text-lg text-gray-D9D9D9')}
      </div>
      {/*TODO REFACTOR CODE status: red*/}
      {/*{currentPage >= MIDDLE_PAGE_NUMBER - 1 && (*/}
      {/*  <div*/}
      {/*    className="grid border px-2 w-8 h-8 items-center justify-center rounded-sm hover:cursor-pointer"*/}
      {/*    onClick={(): Promise<void> => handlePage(1)}>*/}
      {/*    1*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{currentPage > MIDDLE_PAGE_NUMBER - 1 && (*/}
      {/*  <div className="flex gap-1 mx-3 items-center">*/}
      {/*    <div className="w-1 h-1 bg-gray-00000040 rounded-full" />*/}
      {/*    <div className="w-1 h-1 bg-gray-00000040 rounded-full" />*/}
      {/*    <div className="w-1 h-1 bg-gray-00000040 rounded-full" />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{currentPage >= MIDDLE_PAGE_NUMBER ? (*/}
      {/*  <>*/}
      {/*    {[...Array(currentPage)]*/}
      {/*      .slice(currentPage - MIDDLE_PAGE_NUMBER)*/}
      {/*      .map((_, index) => {*/}
      {/*        const page =*/}
      {/*          pageCount > currentPage + Math.floor(MIDDLE_PAGE_NUMBER / 2)*/}
      {/*            ? index + currentPage - Math.floor(MIDDLE_PAGE_NUMBER / 2)*/}
      {/*            : index +*/}
      {/*              currentPage -*/}
      {/*              (MIDDLE_PAGE_NUMBER - (pageCount - currentPage + 1));*/}
      {/*        return (*/}
      {/*          <div*/}
      {/*            key={Math.random()}*/}
      {/*            className={`${*/}
      {/*              currentPage === page ? 'text-blue-1890FF' : ''*/}
      {/*            } ${*/}
      {/*              currentPage === page ? 'border-blue-1890FF' : ''*/}
      {/*            } grid items-center justify-center cursor-pointer border w-8 h-8 mx-1 rounded-sm`}*/}
      {/*            onClick={(): Promise<void> => handlePage(page)}>*/}
      {/*            {<div>{page}</div>}*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    {[...Array(MIDDLE_PAGE_NUMBER)].map((_, index) => {*/}
      {/*      const page =*/}
      {/*        currentPage - Math.floor(MIDDLE_PAGE_NUMBER / 2) > 0*/}
      {/*          ? index + currentPage - Math.floor(MIDDLE_PAGE_NUMBER / 2)*/}
      {/*          : index + 1;*/}
      {/*      return (*/}
      {/*        <div*/}
      {/*          key={Math.random()}*/}
      {/*          className={`${currentPage === page ? 'text-blue-1890FF' : ''} ${*/}
      {/*            currentPage === page ? 'border-blue-1890FF' : ''*/}
      {/*          } grid items-center justify-center cursor-pointer border w-8 h-8 mx-1 rounded-sm`}*/}
      {/*          onClick={(): Promise<void> => handlePage(page)}>*/}
      {/*          {<div>{page}</div>}*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </>*/}
      {/*)}*/}
      {/*{pageCount - 1 > currentPage + Math.floor(MIDDLE_PAGE_NUMBER / 2) && (*/}
      {/*  <div className="flex gap-1 mx-3 items-center">*/}
      {/*    <div className="w-1 h-1 bg-gray-00000040 rounded-full" />*/}
      {/*    <div className="w-1 h-1 bg-gray-00000040 rounded-full" />*/}
      {/*    <div className="w-1 h-1 bg-gray-00000040 rounded-full" />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{pageCount > currentPage + Math.floor(MIDDLE_PAGE_NUMBER / 2) && (*/}
      {/*  <div*/}
      {/*    className="grid border px-2 w-8 h-8 items-center justify-center rounded-sm hover:cursor-pointer"*/}
      {/*    onClick={(): Promise<void> => handlePage(pageCount)}>*/}
      {/*    {pageCount}*/}
      {/*  </div>*/}
      {/*)}*/}

      {[...Array(pageCount)].map((_, i) => {
        const page = i + 1;
        return (
          <div
            key={Math.random()}
            className={`${currentPage === page ? 'text-blue-1890FF' : ''} ${
              currentPage === page ? 'border-blue-1890FF' : ''
            } grid items-center justify-center cursor-pointer border w-8 h-8 mx-1 rounded-sm`}
            onClick={(): Promise<void> => handlePage(page)}>
            {<div>{page}</div>}
          </div>
        );
      })}

      {currentPage !== pageCount && (
        <div
          className="grid border px-2 w-8 h-8 items-center justify-center ml-2 rounded-sm"
          onClick={(): Promise<void> => setCurrentPage(currentPage + 1)}>
          {chevronRightIconBS('text-lg text-black')}
        </div>
      )}
      <div className="flex gap-2 border px-2 w-24 h-8 items-center justify-center rounded-sm ml-2">
        <div>{pageSize}/trang</div>
        {chevronRightIconBS('text-sm')}
      </div>
    </div>
  );
};

export default PaginationSection;
