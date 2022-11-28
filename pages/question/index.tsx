import {useRouter} from 'next/router';
import React, {FC, useMemo, useRef, useState} from 'react';
import Dropdown from '../../components/Dropdown';
import PaginationSection from '../../components/PaginationSection';
import {tailwindOnly} from '../../hocs/tailwindOnly';
import {
  audioIcon,
  closeFileIcon,
  docsIcon,
  exclamationCircleIcon,
  plusIconBS,
  sendIcon,
  trash3Icon,
  trashIcon,
} from '../../public/static/icons';

export const DEFAULT_PAGE_SIZE = 1;
export const MIDDLE_PAGE_NUMBER = 5;

const Question: FC = () => {
  const router = useRouter();
  // const ReactQuill =
  //   typeof window === 'object' ? require('react-quill') : (): boolean => false;
  const quillRef = useRef();
  const [currentPage, setCurrentPage] = useState<number>(5);
  const [showModalCreateQuestion, setShowModalCreateQuestion] = useState<
    boolean
  >(false);
  const [fileImg, setFileImg] = useState<File>(null);
  const [questionType, setQuestionType] = useState<string>('PART 1: PHOTOS');
  const [file, setFile] = useState<string>('');
  const [showErrorFile, setShowErrorFile] = useState({
    isErrorFormat: false,
    isErrorSize: false,
  });
  const [collectNeeds, setCollectNeeds] = useState({
    name: '',
    email: '',
    needsOfUnit: '',
    documentList: undefined,
  });
  // const [question, setQuestion] = useState<Queston>([])

  const questionTypeList = [
    'PART 1: PHOTOS',
    'PART 2: QUESTION- RESPONSE',
    'PART 3: CONVERSATIONS',
    'PART 4: SHORT TALKS',
    'PART 5: INCOMPLETE SENTENCES',
    'PART 6: TEXT COMPLETION',
    'PART 7: SINGLE PASSAGES',
    'PART 7: DOUBLE PASSAGES',
    'PART 7: TRIPLE PASSAGES',
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{list: 'ordered'}, {list: 'bullet'}],
          [{script: 'sub'}, {script: 'super'}],
          [{indent: '-1'}, {indent: '+1'}],
          [{size: ['small', false, 'large', 'huge']}],
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          ['link', 'image'],
          [{color: []}, {background: []}],
          [{align: []}],
        ],
      },
    }),
    [],
  );
  const questionList = [
    {
      id: 'MD0001',
      studentName: 'Truong Hai Dang',
      examsQuestions: 'Đề thi số 1',
      examCourse: '2022',
      status: 'Ready',
      reviewed: 'Reviewed',
      point: '650',
      examTime: '45:00',
    },
    {
      id: 'MD0001',
      studentName: 'Truong Hai Dang',
      examsQuestions: 'Đề thi số 1',
      examCourse: '2022',
      status: 'Ready',
      reviewed: 'Reviewed',
      point: '650',
      examTime: '45:00',
    },
    {
      id: 'MD0001',
      studentName: 'Truong Hai Dang',
      examsQuestions: 'Đề thi số 1',
      examCourse: '2022',
      status: 'Ready',
      reviewed: 'Reviewed',
      point: '650',
      examTime: '45:00',
    },
    {
      id: 'MD0001',
      studentName: 'Truong Hai Dang',
      examsQuestions: 'Đề thi số 1',
      examCourse: '2022',
      status: 'Ready',
      reviewed: 'Reviewed',
      point: '650',
      examTime: '45:00',
    },
    {
      id: 'MD0001',
      studentName: 'Truong Hai Dang',
      examsQuestions: 'Đề thi số 1',
      examCourse: '2022',
      status: 'Ready',
      reviewed: 'Reviewed',
      point: '650',
      examTime: '45:00',
    },
    {
      id: 'MD0001',
      studentName: 'Truong Hai Dang',
      examsQuestions: 'Đề thi số 1',
      examCourse: '2022',
      status: 'Ready',
      reviewed: 'Reviewed',
      point: '650',
      examTime: '45:00',
    },
  ];

  const uploadImage = (event): void => {
    if (event.target.files && event.target.files[0]) {
      setFileImg(event.target.files[0]);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileName = e.target.value.split(/(\\|\/)/g).pop();
    if (e.target.files && e.target.files[0].size / 1024 / 1024 >= 10) {
      setShowErrorFile({...showErrorFile, isErrorSize: true});
      return;
    }
    if (fileName.includes('.mp3')) {
      setShowErrorFile({
        ...showErrorFile,
        isErrorSize: false,
        isErrorFormat: false,
      });
      setFile(e.target.value.split(/(\\|\/)/g).pop());
      setCollectNeeds({...collectNeeds, documentList: e.target.files[0]});
    } else setShowErrorFile({...showErrorFile, isErrorFormat: true});
  };

  const hanldeDeleteFile = (): void => {
    setFile('');
    setCollectNeeds({...collectNeeds, documentList: undefined});
  };

  const handleQuestionCreateElement = () => {
    switch (questionType) {
      case 'PART 1: PHOTOS':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">Tải ảnh cho câu hỏi:</span>
                {fileImg && (
                  <div className="avatar w-40 h-40 mt-4">
                    <img
                      src={URL.createObjectURL(fileImg)}
                      className="w-full h-full"
                    />
                  </div>
                )}
                <label
                  htmlFor="dropzone-file"
                  className="justify-center cursor-pointer">
                  <div className="flex gap-1 border rounded-md mt-4 py-1 px-3 w-28 justify-center items-center">
                    {plusIconBS('text-2xl')}
                    <div>Tải ảnh</div>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e): void => uploadImage(e)}
                  />
                </label>
              </div>
              <div className="...">
                <span className="">Tải Audio cho câu hỏi:</span>
                {file && (
                  <div
                    className="flex gap-3 items-center mt-4"
                    key={Math.random()}>
                    {audioIcon}
                    <u className="text-base font-normal">{file}</u>
                    <div
                      className="cursor-pointer"
                      role="presentation"
                      onClick={hanldeDeleteFile}>
                      {closeFileIcon}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    htmlFor="files"
                    className={`flex gap-1 border rounded-md py-1 px-3 w-28 justify-center items-center`}>
                    {plusIconBS()}
                    <div>Tải audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="Tải tệp lên"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div>
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 4"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 2: QUESTION- RESPONSE':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">Tải Audio cho câu hỏi:</span>
                {file && (
                  <div
                    className="flex gap-3 items-center mt-4"
                    key={Math.random()}>
                    {audioIcon}
                    <u className="text-base font-normal">{file}</u>
                    <div
                      className="cursor-pointer"
                      role="presentation"
                      onClick={hanldeDeleteFile}>
                      {closeFileIcon}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    htmlFor="files"
                    className={`flex gap-1 border rounded-md py-1 px-3 w-28 justify-center items-center`}>
                    {plusIconBS()}
                    <div>Tải audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="Tải tệp lên"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div>
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                  checked
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                  checked
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 3: CONVERSATIONS':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">Tải Audio cho câu hỏi:</span>
                {file && (
                  <div
                    className="flex gap-3 items-center mt-4"
                    key={Math.random()}>
                    {audioIcon}
                    <u className="text-base font-normal">{file}</u>
                    <div
                      className="cursor-pointer"
                      role="presentation"
                      onClick={hanldeDeleteFile}>
                      {closeFileIcon}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    htmlFor="files"
                    className={`flex gap-1 border rounded-md py-1 px-3 w-28 justify-center items-center`}>
                    {plusIconBS()}
                    <div>Tải audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="Tải tệp lên"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 4: SHORT TALKS':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">Tải Audio cho câu hỏi:</span>
                {file && (
                  <div
                    className="flex gap-3 items-center mt-4"
                    key={Math.random()}>
                    {audioIcon}
                    <u className="text-base font-normal">{file}</u>
                    <div
                      className="cursor-pointer"
                      role="presentation"
                      onClick={hanldeDeleteFile}>
                      {closeFileIcon}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label
                    htmlFor="files"
                    className={`flex gap-1 border rounded-md py-1 px-3 w-28 justify-center items-center`}>
                    {plusIconBS()}
                    <div>Tải audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="Tải tệp lên"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 5: INCOMPLETE SENTENCES':
        return (
          <>
            <div className="mt-5">
              <span>Nhập câu hỏi:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 6: TEXT COMPLETION':
        return (
          <>
            <div className="mt-5">
              <span>Nhập đoạn văn:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 7: SINGLE PASSAGES':
        return (
          <>
            <div className="mt-5">
              <span>Nhập đoạn văn:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 7: DOUBLE PASSAGES':
        return (
          <>
            <div className="mt-5">
              <span>Nhập đoạn văn:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      case 'PART 7: TRIPLE PASSAGES':
        return (
          <>
            <div className="mt-5">
              <span>Nhập đoạn văn:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
            <div className="mt-5">
              <span>Tích để chọn 1 câu trả lời đúng</span>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 1"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 2"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 "
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="Câu trả lời 3"
                  // value="USA"
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">Tên đề thi:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-2 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-7">
              <span className="text-white-0A1B39 font-normal">
                Mô tả bài thi:
              </span>
              <div className="flex gap-3">
                <textarea
                  className="mt-1 p-2 resize rounded-sm border-2 outline-none w-full h-20"
                  placeholder="Nhâp mô tả cho đề thi của bạn"></textarea>
                {exclamationCircleIcon('mt-3 text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="gap-4 items-center my-6">
              <span className="">Tải ảnh cho đề thi:</span>
              <label
                htmlFor="dropzone-file"
                className="justify-center cursor-pointer">
                <div className="mt-2 p-5 w-[104px] border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
                  {plusIconBS('text-2xl')}
                  <div className="text-gray-00000040">Tải ảnh</div>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e): void => uploadImage(e)}
                />
              </label>
            </div>
            <div className="flex gap-[70px] mt-7">
              <div className="">
                <span className="text-sm text-white-0A1B39 font-normal">
                  Trạng thái đề thi
                </span>
                <div className="flex gap-4 items-center mt-3">
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
          </>
        );
    }
  };

  const pageCount = Math.ceil(questionList.length / DEFAULT_PAGE_SIZE);

  return (
    <div className="container">
      {/* <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="Nội dung"
        modules={modules}
        value={contentPost.content}
        onChange={(value) => setContentPost({ ...contentPost, content: value })}
      /> */}
      <div className="bg-white py-4">
        <h4 className="flex text-center text-white-0A1B39 font-medium text-xl mb-4">
          Danh sách câu hỏi
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
        <div></div>
        <Dropdown
          dropdownList={questionTypeList}
          selectedOption={questionType}
          setSelectedOption={setQuestionType}
        />
      </div>
      <div className="bg-white mt-5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end p-4">
              <div className="flex gap-3 mt-4">
                <button
                  className="flex gap-2 items-center h-full btn px-6 py-1.5 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                  type="button">
                  <span className="flex gap-1 items-center">
                    {plusIconBS('text-xl')}
                    <span
                      className="text-base"
                      onClick={(): void => setShowModalCreateQuestion(true)}>
                      Tạo mới câu hỏi
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Mã câu hỏi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ảnh
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Audio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Loại câu hỏi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hoạt động
                  </th>
                </tr>
              </thead>
              <tbody>
                {(questionList || []).map(item => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={Math.random()}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium dark:text-white whitespace-nowrap text-blue-1890FF">
                      {item.id}
                    </th>
                    <td className="px-6 py-4">{item.studentName}</td>
                    <td className="px-6 py-4">{item.examsQuestions}</td>
                    <td className="px-6 py-4">{item.examCourse}</td>
                    <td className="flex items-center gap-1.5 px-6 py-4">
                      <div className="w-1.5 h-1.5 bg-[#52C41A] rounded-full" />
                      <span>{item.status}</span>
                    </td>
                    <td className="px-6 py-4">{item.examTime}</td>
                    {/* <td className="px-6 py-4">{item.numberParticipants}</td> */}
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
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={(n): Promise<void> => {
                  setCurrentPage(n);
                  return;
                }}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="max-w-2xl mx-auto relative">
          <div
            id="default-modal"
            data-modal-show="true"
            aria-hidden="true"
            className={`overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center ${
              showModalCreateQuestion ? 'visible bg-gray-0000008c' : 'invisible'
            }`}>
            <div className="relative w-full max-w-5xl px-4 h-full md:h-auto mx-auto mt-[5%]">
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                  <span className="text-base font-semibold">
                    Tạo mới đề thi
                  </span>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="default-modal"
                    onClick={(): void => setShowModalCreateQuestion(false)}>
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
                  <div className="py-5 px-6">
                    <div className="mb-3">Chọn loại câu hỏi</div>
                    <Dropdown
                      dropdownList={questionTypeList}
                      selectedOption={questionType}
                      setSelectedOption={setQuestionType}
                    />
                    {handleQuestionCreateElement()}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="text-black-595959 border border-gray-00000040 font-medium rounded-sm text-sm px-8 py-2 text-center"
                    onClick={(): void => setShowModalCreateQuestion(false)}>
                    Hủy
                  </button>
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="flex gap-2 items-center text-sm px-8 py-2.5 border-2 border-green-00BF6F text-white font-medium leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                    onClick={(): void => setShowModalCreateQuestion(false)}>
                    Tạo đề thi
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

export default tailwindOnly(Question);
