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
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';

export const DEFAULT_PAGE_SIZE = 1;
export const MIDDLE_PAGE_NUMBER = 5;

const QuestionCreate: FC = () => {
  const router = useRouter();
  const quillRef = useRef<HTMLInputElement>(null);
  const [showModalCreateQuestion, setShowModalCreateQuestion] = useState<
    boolean
  >(true);
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
              <i>Tích để chọn 1 câu trả lời đúng</i>
              <div className="flex gap-3 items-center bg-[#F9F9F9] mt-5 w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600"
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <i>Tích để chọn 1 câu trả lời đúng</i>
              <div className="flex gap-3 items-center bg-[#F9F9F9] mt-5 w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
            <i>Tích để chọn 1 câu trả lời đúng</i>
            <div className="mt-5">
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
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  />
                </div>
              </div>
            </div>
            <i>Tích để chọn 1 câu trả lời đúng</i>
            <div className="mt-5">
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
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <i>Tích để chọn 1 câu trả lời đúng</i>
              <div className="flex gap-3 items-center bg-[#F9F9F9] mt-5 w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
            <div className="my-5">
              <span>Nhập đoạn văn:</span>
              <div className="mt-5">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="Nội dung"
                  modules={modules}
                  // value={contentPost.content}
                  // onChange={(value) => setContentPost({ ...contentPost, content: value })}
                />
              </div>
              {/* <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập tên đề thi của bạn"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div> */}
            </div>
            <i>Tích để chọn 1 câu trả lời đúng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
            <div className="my-5">
              <span>Nhập đoạn văn:</span>
              <div className="mt-5">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="Nội dung"
                  modules={modules}
                  // value={contentPost.content}
                  // onChange={(value) => setContentPost({ ...contentPost, content: value })}
                />
              </div>
            </div>
            <i>Tích để chọn 1 câu trả lời đúng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {/* <span>Tích để chọn 1 câu trả lời đúng</span> */}
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {/* <span>Tích để chọn 1 câu trả lời đúng</span> */}
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {/* <span>Tích để chọn 1 câu trả lời đúng</span> */}
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
            <div className="my-5">
              <span>Nhập đoạn văn:</span>
              <div className="mt-5">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="Nội dung"
                  modules={modules}
                  // value={contentPost.content}
                  // onChange={(value) => setContentPost({ ...contentPost, content: value })}
                />
              </div>
            </div>
            <i className="mt-5">Tích để chọn 1 câu trả lời đúng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
            <div className="my-5">
              <span className="text-white-0A1B39 font-normal">
                Nhập đoạn văn:
              </span>
              <div className="mt-5">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="Nội dung"
                  modules={modules}
                  // value={contentPost.content}
                  // onChange={(value) => setContentPost({ ...contentPost, content: value })}
                />
              </div>
            </div>
            <i className="mt-5">Tích để chọn 1 câu trả lời đúng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
              <span className="text-white-0A1B39 font-normal">
                Nhập câu hỏi:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nhập câu hỏi"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 items-center bg-[#F9F9F9] w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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
                  className="h-5 w-5 accent-green-600 "
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

  return (
    <div className="container">
      <div className="bg-white rounded-lg relative dark:bg-gray-700">
        <div className="flex items-center justify-between p-5 mt-5 rounded-t">
          <span className="text-xl font-semibold">Tạo mới đề thi</span>
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
        <div className="flex justify-end space-x-2 p-6 border-gray-200 rounded-b">
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
  );
};

export default tailwindOnly(QuestionCreate);
