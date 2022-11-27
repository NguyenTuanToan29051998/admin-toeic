import React, {FC, useState} from 'react';
import CreateQuestion from '../../components/CreateQuestion';
import Dropdown from '../../components/Dropdown';
import {tailwindOnly} from '../../hocs/tailwindOnly';
import {
  chevronRightIcon,
  chooseIcon,
  editIcon,
  exclamationCircleIcon,
  plusIconBS,
} from '../../public/static/icons';

const Create: FC = () => {
  const [showModalCreateExam, setShowModalCreateExam] = useState<boolean>(
    false,
  );
  const [fileImg, setFileImg] = useState<File>(null);
  const [examType, setExamType] = useState<string>('Toeic');
  const [selectedQuestion, setSelectedQuestion] = useState<boolean>(false);
  const [numberSelected, setNumberSelected] = useState<number>(-1);

  const examTypeList = ['Toeic', 'Ielts'];

  const collections = [
    {
      id: 'COL001',
      name: 'Collection Name 1',
      img: 'https://clipground.com/images/img_avatar-png-2.png',
      describe:
        'Lorem aliquet est risus. Lorem aliquet est risus pretium, cursus.',
      level: 'Level 1',
      status: 'Publish',
      createTime: '$2021-02-05 08:28:36',
    },
    {
      id: 'COL001',
      name: 'Collection Name 2',
      img: 'https://clipground.com/images/img_avatar-png-2.png',
      describe:
        'Lorem aliquet est risus. Lorem aliquet est risus pretium, cursus.',
      level: 'Level 1',
      status: 'Private',
      createTime: '$2021-02-05 08:28:36',
    },
    {
      id: 'COL001',
      name: 'Collection Name 1',
      img: 'https://clipground.com/images/img_avatar-png-2.png',
      describe:
        'Lorem aliquet est risus. Lorem aliquet est risus pretium, cursus.',
      level: 'Level 3',
      status: 'Publish',
      createTime: '$2021-02-05 08:28:36',
    },
    {
      id: 'COL001',
      name: 'Collection Name 1',
      img: 'https://clipground.com/images/img_avatar-png-2.png',
      describe: 'Mô tả Collection 1',
      level: 'Level 1',
      status: 'Publish',
      createTime: '$2021-02-05 08:28:36',
    },
    {
      id: 'COL001',
      name: 'Collection Name 1',
      img: 'https://clipground.com/images/img_avatar-png-2.png',
      describe: 'Mô tả Collection 1',
      level: 'Level 1',
      status: 'Publish',
      createTime: '$2021-02-05 08:28:36',
    },
  ];

  const uploadImage = (event): void => {
    if (event.target.files && event.target.files[0]) {
      setFileImg(event.target.files[0]);
    }
  };

  return (
    <div className="">
      <div className="bg-white py-4">
        <h4 className="flex text-center text-white-0A1B39 font-medium text-xl mb-4">
          Quản lý Collection
        </h4>
        <span className="text-white-0A1B39 mt-4">
          Bạn có thể tạo mới các Collection của mình, để dễ quản lý câu hỏi, bài
          thi dễ dàng hơn
        </span>
      </div>

      {/*FORM*/}
      <div className="bg-white">
        <div className="pb-5">
          <div className="bg-white rounded-lg relative dark:bg-gray-700">
            <div className="bg-white">
              <div className="mt-5 py-5 px-6">
                {/* <span>Bạn có thể tạo mới các Khóa thi của mình, để dễ quản lý đề thi, bài thi dễ dàng hơn</span> */}
                <div className="">
                  <span className="text-sm text-white-0A1B39 font-normal">
                    Tên đề thi:
                  </span>
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
                  <span className="text-sm text-white-0A1B39 font-normal">
                    Mô tả bài thi:
                  </span>
                  <div className="flex gap-3">
                    <textarea
                      className="mt-1 p-2 resize rounded-sm border-2 outline-none w-full h-20"
                      placeholder="Nhâp mô tả cho đề thi của bạn"></textarea>
                    {exclamationCircleIcon('mt-3 text-blue-2F80ED text-xl')}
                  </div>
                </div>
                <div className="flex gap-40 my-6">
                  <div className="gap-4 items-center">
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
                  <div className="">
                    <span className="text-sm text-white-0A1B39 font-normal">
                      Khóa thi
                    </span>
                    <Dropdown
                      dropdownList={examTypeList}
                      selectedOption={examType}
                      setSelectedOption={setExamType}
                    />
                  </div>
                  <div className="">
                    <span className="text-sm text-white-0A1B39 font-normal">
                      Thời gian thi
                    </span>
                    <Dropdown
                      dropdownList={examTypeList}
                      selectedOption={examType}
                      setSelectedOption={setExamType}
                    />
                  </div>
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
                <div className="grid items-center justify-end pr-4 h-10 bg-gray-F7F7F7 ">
                  <div className="flex gap-2 items-center h-6 w-20 btn px-3 py-1 text-white font-medium text-xs leading-tight rounded-sm hover:bg-blue-40A9FF focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-40A9FF">
                    {editIcon}
                    <button className="flex gap-2" type="button">
                      <span className="text-base">Sửa</span>
                    </button>
                  </div>
                </div>
                <CreateQuestion />
                <div className="flex gap-4 mt-4">
                  <button
                    className="flex gap-2 items-center h-full btn px-4 py-1 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                    type="button">
                    <span className="flex gap-1 items-center">
                      {plusIconBS('text-xl')}
                      <span className="text-base">Tạo mới câu hỏi</span>
                    </span>
                  </button>
                  <button
                    className="flex gap-2 items-center h-full btn px-4 py-[7px] border border-green-00BF6F text-green-00BF6F font-medium text-xs leading-tight rounded-sm focus:outline-none transition duration-150 ease-in-out bg-white"
                    type="button">
                    <span className="flex gap-2 items-center">
                      {chooseIcon}
                      <span
                        className="text-base"
                        onClick={(): void => setShowModalCreateExam(true)}>
                        Chọn từ Collection
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-10 mr-5 place-content-end">
              <button
                className="flex gap-2 items-center h-full btn px-8 py-1.5 border-2 border-green-00BF6F text-white font-medium text-xs leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F rounded-sm"
                type="button">
                <span className="text-base">Lưu</span>
              </button>
              <button
                className="flex gap-2 items-center h-full btn px-6 py-1.5 border-2 hover:border-red-FF4D4F hover:text-red-FF4D4F font-medium text-xs leading-tight focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-white rounded-sm"
                type="button"
                id="button-addon3">
                <span className="text-base">Hủy</span>
              </button>
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
              showModalCreateExam ? 'visible bg-gray-0000008c' : 'invisible'
            }`}>
            <div className="relative w-full max-w-7xl px-3 h-full md:h-auto mx-auto mt-[5%]">
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex items-start justify-between px-5 py-4 border-b rounded-t dark:border-gray-600">
                  <span className="text-base font-semibold">
                    Nhập câu hỏi từ Collection
                  </span>
                  {/* <span className="text-white-0A1B39 mt-4">
										Bạn có thể tạo mới các Collection của mình, để dễ quản lý câu hỏi, bài
										thi dễ dàng hơn
									</span> */}
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="default-modal"
                    onClick={(): void => setShowModalCreateExam(false)}>
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
                  <div className="grid grid-cols-3 gap-4 px-6 py-4">
                    <div className="...">
                      <div className="text-base font-medium text-white-0A1B39">
                        Collection List:
                      </div>
                      <div className="mt-2 border rounded px-2 py-4 bg-white-F9f9f9">
                        {(collections || []).map((item, index) => {
                          return (
                            <div
                              className={`grid grid-cols-12 gap-2 p-2 border rounded bg-white mb-2 hover:cursor-pointer ${
                                numberSelected === index
                                  ? 'hover: border-green-00BF6F'
                                  : ''
                              }`}
                              key={Math.random()}
                              onClick={(): void => setNumberSelected(index)}>
                              <img
                                className="col-span-2 ... rounded-full"
                                src="https://clipground.com/images/img_avatar-png-2.png"
                                alt="avt"
                              />
                              <div className="col-span-8 ...">
                                <p className="text-base font-medium text-white-0A1B39">
                                  {item.name}
                                </p>
                                <p className="text-sm text-[#00000073]">
                                  {item.describe}
                                </p>
                                <p className="text-sm text-green-00BF6F">
                                  100 Questions
                                </p>
                              </div>
                              <div className="col-span-2 ... place-self-center ml-2">
                                {chevronRightIcon}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-span-2 ...">
                      <div className="text-sm font-medium">Chọn Câu hỏi :</div>
                      <div className="mt-2 rounded border-1 px-2 py-4">
                        <div className="border-2 rounded-md border-gray-E5E6EC w-full p-4">
                          <div className="flex items-center">
                            <div className="flex flex-auto gap-3">
                              <div className="">
                                <span className="font-bold">Question 1</span>:
                                <span className="ml-3">
                                  What is the problem?
                                </span>
                              </div>
                              {exclamationCircleIcon(
                                'text-blue-2F80ED text-xl',
                              )}
                            </div>
                            <div className="flex gap-3">
                              {selectedQuestion ? (
                                <button
                                  data-modal-toggle="default-modal"
                                  type="button"
                                  className="text-black-595959 border border-gray-00000040 font-medium rounded-sm text-sm px-4 py-1.5 text-center"
                                  onClick={(): void =>
                                    setSelectedQuestion(false)
                                  }>
                                  Bỏ chọn
                                </button>
                              ) : (
                                <button
                                  data-modal-toggle="default-modal"
                                  type="button"
                                  className="flex gap-2 items-center text-sm px-4 py-2 border-1.5 border-green-00BF6F text-white font-medium leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                                  onClick={(): void =>
                                    setSelectedQuestion(true)
                                  }>
                                  Chọn câu hỏi này
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="">
                              <div className="mt-2 p-5 w-[104px] border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
                                {plusIconBS('text-2xl')}
                                <div className="text-gray-00000040">Upload</div>
                              </div>
                            </div>
                            <audio
                              className="w-[600px] h-9"
                              data-producer="Philadelphia Harmonic"
                              controls
                              id="myaudio">
                              <source src="/media/epic.mp3" type="audio/mpeg" />
                              <source src="/media/epic.wav" type="audio/wav" />
                            </audio>
                          </div>
                          <div className="mt-5">
                            <span>Tích để chọn 1 câu trả lời đúng</span>
                            <div className="mt-4">
                              <div className="flex gap-2 items-center mb-5">
                                <input
                                  id="country-option-1"
                                  type="radio"
                                  name="countries"
                                  value="USA"
                                  className="h-5 w-5 opacity-30 focus:ring-green-00BF6F"
                                  aria-labelledby="country-option-1"
                                  aria-describedby="country-option-1"
                                  // checked
                                />
                                <span className="font-bold">A</span>
                                <span className="ml-2">
                                  A meeting had to be rescheduled.
                                </span>
                              </div>
                              <div className="flex gap-2 items-center mb-5">
                                <input
                                  id="country-option-1"
                                  type="radio"
                                  name="countries"
                                  value="USA"
                                  className="h-5 w-5 opacity-30 focus:ring-green-00BF6F"
                                  aria-labelledby="country-option-1"
                                  aria-describedby="country-option-1"
                                  // checked
                                />
                                <span className="font-bold">B</span>
                                <span className="ml-2">
                                  A meeting had to be rescheduled.
                                </span>
                              </div>
                              <div className="flex gap-2 items-center mb-5">
                                <input
                                  id="country-option-1"
                                  type="radio"
                                  name="countries"
                                  value="USA"
                                  className="h-5 w-5 opacity-30 focus:ring-green-00BF6F"
                                  aria-labelledby="country-option-1"
                                  aria-describedby="country-option-1"
                                  // checked
                                />
                                <span className="font-bold">C</span>
                                <span className="ml-2">
                                  A meeting had to be rescheduled.
                                </span>
                              </div>
                              <div className="flex gap-2 items-center mb-5">
                                <input
                                  id="country-option-1"
                                  type="radio"
                                  name="countries"
                                  value="USA"
                                  className="h-5 w-5 opacity-30 focus:ring-green-00BF6F"
                                  aria-labelledby="country-option-1"
                                  aria-describedby="country-option-1"
                                  // checked
                                />
                                <span className="font-bold">D</span>
                                <span className="ml-2">
                                  A meeting had to be rescheduled.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="text-black-595959 border border-gray-00000040 font-medium rounded-sm text-sm px-8 py-2 text-center"
                    onClick={(): void => setShowModalCreateExam(false)}>
                    Hủy
                  </button>
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="flex gap-2 items-center text-sm px-8 py-2.5 border-2 border-green-00BF6F text-white font-medium leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
                    onClick={(): void => setShowModalCreateExam(false)}>
                    Nhập vào đề thi
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

export default tailwindOnly(Create);
