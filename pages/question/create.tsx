import {useRouter} from 'next/router';
import React, {ChangeEvent, FC, useMemo, useRef, useState} from 'react';
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
import {questionApiManagement} from '../../api-clients/question';
import {
  AnswersType,
  GroupQuestionType,
  QuestionType,
} from '../../models/question';
import {TYPE_QUESTION} from '../../public/static/const';
import Answer from '../../components/Answer';
import {QuestionList} from '../../models/admin/Question';

export const DEFAULT_PAGE_SIZE = 1;
export const MIDDLE_PAGE_NUMBER = 5;

const QuestionCreate: FC = () => {
  const router = useRouter();
  const quillRef = useRef<HTMLInputElement>(null);
  const [showModalCreateQuestion, setShowModalCreateQuestion] = useState<
    boolean
  >(true);
  const [fileImg, setFileImg] = useState<File>(null);
  const [questionType, setQuestionType] = useState<string>(
    'PART 6: TEXT COMPLETION',
  );
  const [file, setFile] = useState<string>('');
  const [showErrorFile, setShowErrorFile] = useState({
    isErrorFormat: false,
    isErrorSize: false,
  });
  const [groupQuestion, setGroupQuestion] = useState<GroupQuestionType>({
    content: '',
    question: [
      {
        id: 1,
        content: '',
        audio: '',
        images: '',
        typeQuestion: '',
        correctAnswerWord: '',
        answers: [
          {
            order: 1,
            content: '',
            isCorrect: true,
          },
        ],
      },
    ],
  });
  const [questionList, setQuestionList] = useState<QuestionType[]>([
    {
      id: 1,
      content: '',
      audio: '',
      images: '',
      typeQuestion: '',
      correctAnswerWord: '',
      answers: [
        {
          order: 1,
          content: '',
          isCorrect: true,
        },
        {
          order: 2,
          content: '',
          isCorrect: true,
        },
        {
          order: 3,
          content: '',
          isCorrect: true,
        },
        {
          order: 4,
          content: '',
          isCorrect: true,
        },
      ],
    },
    {
      id: 2,
      content: '',
      audio: '',
      images: '',
      typeQuestion: '',
      correctAnswerWord: '',
      answers: [
        {
          order: 1,
          content: '',
          isCorrect: true,
        },
        {
          order: 2,
          content: '',
          isCorrect: true,
        },
        {
          order: 3,
          content: '',
          isCorrect: true,
        },
        {
          order: 4,
          content: '',
          isCorrect: true,
        },
      ],
    },
    {
      id: 3,
      content: '',
      audio: '',
      images: '',
      typeQuestion: '',
      correctAnswerWord: '',
      answers: [
        {
          order: 1,
          content: '',
          isCorrect: true,
        },
        {
          order: 2,
          content: '',
          isCorrect: true,
        },
        {
          order: 3,
          content: '',
          isCorrect: true,
        },
        {
          order: 4,
          content: '',
          isCorrect: true,
        },
      ],
    },
    {
      id: 4,
      content: '',
      audio: '',
      images: '',
      typeQuestion: '',
      correctAnswerWord: '',
      answers: [
        {
          order: 1,
          content: '',
          isCorrect: true,
        },
        {
          order: 2,
          content: '',
          isCorrect: true,
        },
        {
          order: 3,
          content: '',
          isCorrect: true,
        },
        {
          order: 4,
          content: '',
          isCorrect: true,
        },
      ],
    },
  ]);
  const [answerList, setAnswerList] = useState<AnswersType[]>([
    {
      order: 1,
      content: '',
      isCorrect: true,
    },
    {
      order: 2,
      content: '',
      isCorrect: true,
    },
    {
      order: 3,
      content: '',
      isCorrect: true,
    },
    {
      order: 4,
      content: '',
      isCorrect: true,
    },
  ]);
  const [
    numberCorrectAnswerQuestionOne,
    setNumberCorrectAnswerQuestionOne,
  ] = useState(0);
  const [
    numberCorrectAnswerQuestionTwo,
    setNumberCorrectAnswerQuestionTwo,
  ] = useState(0);
  const [
    numberCorrectAnswerQuestionThree,
    setNumberCorrectAnswerQuestionThree,
  ] = useState(0);
  const [
    numberCorrectAnswerQuestionFour,
    setNumberCorrectAnswerQuestionFour,
  ] = useState(0);
  // const [answer, setAnswer] = useState<AnswersType>();

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
      setGroupQuestion({...groupQuestion, audio: e.target.files[0]});
    } else setShowErrorFile({...showErrorFile, isErrorFormat: true});
  };

  const hanldeDeleteFile = (): void => {
    setFile('');
    setGroupQuestion({...groupQuestion, audio: undefined});
  };

  const handleCreateExam = (): void => {
    const questionListClone = questionList;
    questionListClone.map(item => {
      switch (item.id) {
        case 1:
          return {
            ...item,
            correctAnswerWord: numberCorrectAnswerQuestionOne.toString(),
          };
        case 2:
          return {
            ...item,
            correctAnswerWord: numberCorrectAnswerQuestionTwo.toString(),
          };
        case 3:
          return {
            ...item,
            correctAnswerWord: numberCorrectAnswerQuestionThree.toString(),
          };
        default:
          return {
            ...item,
            correctAnswerWord: numberCorrectAnswerQuestionFour.toString(),
          };
      }
      return item;
    }),
      console.log(questionListClone, 'conent');
    // const test = questionList.map(item => {
    //   delete item.id;
    //   return item;
    // });
    // console.log(test, 'test');
    console.log(answerList, 'l??');
    let typeQuestion;
    switch (questionType) {
      case 'PART 1: PHOTOS': {
        typeQuestion = TYPE_QUESTION.PART1;
        break;
      }
      case 'PART 2: QUESTION- RESPONSE': {
        typeQuestion = TYPE_QUESTION.PART2;
        break;
      }
      case 'PART 3: CONVERSATIONS': {
        typeQuestion = TYPE_QUESTION.PART3;
        break;
      }
      case 'PART 4: SHORT TALKS': {
        typeQuestion = TYPE_QUESTION.PART4;
        break;
      }
      case 'PART 5: INCOMPLETE SENTENCES': {
        typeQuestion = TYPE_QUESTION.PART5;
        break;
      }
      case 'PART 6: TEXT COMPLETION': {
        typeQuestion = TYPE_QUESTION.PART6;
        break;
      }
      case 'PART 7: SINGLE PASSAGES': {
        typeQuestion = TYPE_QUESTION.PART7;
        break;
      }
      case 'PART 7: DOUBLE PASSAGES': {
        typeQuestion = TYPE_QUESTION.PART7;
        break;
      }
      case 'PART 7: TRIPLE PASSAGES': {
        typeQuestion = TYPE_QUESTION.PART7;
        break;
      }
      default:
        typeQuestion = TYPE_QUESTION.PART7;
        break;
    }
    const data = {
      query:
        'mutation AddGroupQuestion($groupQuestion: CreateGroupQuestionInput!) {\n  createGroupQuestion(createGroupQuestionInput: $groupQuestion) {\n    _id,\n    content,\n    questions {\n      _id,\n      content,\n      groupQuestionId,\n\t\t\tanswers {\n        _id\n        content\n        isCorrect\n      },\n      correctAnswerWord\n    }\n  }\n}',
      variables: {
        groupQuestion: {
          content: '',
          images: '',
          audio: '',
          questions: [
            {
              content: '',
              images: '',
              audio: '',
              typeQuestion: typeQuestion,
              correctAnswerWord: numberCorrectAnswerQuestionOne.toString(),
              answers: answerList,
            },
          ],
        },
      },
    };
    // questionApiManagement.createQuestion(data);

    // const data = {
    //   query:
    //     'mutation AddnNewQuetion($question: CreateQuestionInput!) {\n  createQuestion(createQuestionInput: $question) {\n    _id\n  }\n}\n\n# query getAllQuetion {\n#   questions(listQuestionsInput: { limit: 5, offset: 0 }) {\n#     _id\n#     content\n#     images\n#     audio\n#     typeQuestion\n#     answers {\n#       _id\n#       order\n#       content\n#       isCorrect\n#     }\n#   }\n# }',
    //   variables: {
    //     question: {
    //       content: 'toan-test',
    //       images: '',
    //       audio: '',
    //       typeQuestion: 'PART1',
    //       correctAnswerWord: '',
    //       answers: [
    //         {
    //           order: 1,
    //           content: 'sdsd',
    //           isCorrect: true,
    //         },
    //       ],
    //     },
    //   },
    // };
  };

  const handlChangeAnswer = (
    e: ChangeEvent<HTMLInputElement>,
    order: number,
    id: number,
  ): void => {
    e.preventDefault();
    setAnswerList(
      answerList.map(val => {
        if (val.order === order) {
          return {...val, content: e.target.value};
        }
        return val;
      }),
    );
    // console.log(
    //   questionList.map(item => {
    //     item.answers.map(val => {
    //       if (val.order === order) {
    //         return {...val, content: e.target.value};
    //       }
    //       return val;
    //     });
    //     return item;
    //   })
    // );
    // questionList.map((item, index) => {
    //   item.answers.map((val, ind) => {
    //     if (val.order === order) {
    //       setQuestionList({...questionList[index].answers, [content: e.target.value] })
    //     }
    //     return {...item, val};
    //   });
    //   console.log(item, 'item');
    //   return item;
    // }),
    const questionListClone = questionList;
    questionListClone.map(item => {
      item.answers.map(val => {
        if (val.order === order && item.id === id) {
          val.content = e.target.value;
        }
        return val;
      });
      return item;
    }),
      setQuestionList(questionListClone);
  };

  const handleChangeQuestionName = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
  ): void => {
    const questionListClone = questionList;
    questionListClone.map(val => {
      if (val.id === id) {
        val.content = e.target.value;
      }
      return val;
    });
    setQuestionList(questionListClone);
  };

  const handleQuestionCreateElement = () => {
    // <div className={styles.content} dangerouslySetInnerHTML={{ __html: previewContent(item.content) }} />
    switch (questionType) {
      case 'PART 1: PHOTOS':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">T???i ???nh cho c??u h???i:</span>
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
                  <div className="flex gap-1 border rounded-md mt-4 py-1 px-3 w-28 justify-center items-center mb-5">
                    {plusIconBS('text-2xl')}
                    <div>T???i ???nh</div>
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
                <span className="">T???i Audio cho c??u h???i:</span>
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
                    className={`flex gap-1 border rounded-md py-1 px-3 w-28 justify-center items-center cursor-pointer`}>
                    {plusIconBS()}
                    <div>T???i audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="T???i t???p l??n"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div>
              <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`answer-${index}`}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[0].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 1)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
              {/* <div className="flex gap-3 items-center bg-[#F9F9F9] mt-5 w-5/6 mb-3 p-4">
                <input
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="USA"
                  className="h-5 w-5 accent-green-600"
                  aria-labelledby="country-option-1"
                  aria-describedby="country-option-1"
                  checked={numberCorrectAnswerQuestionOne === 0 && true}
                  onClick={() => setNumberCorrectAnswerQuestionOne(0)}
                />
                <input
                  id=""
                  type="text"
                  name="countries"
                  placeholder="C??u tr??? l???i 1"
                  value={answerList[0].content}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    handlChangeAnswer(e, 1)
                  }
                  className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
                />
              </div> */}
            </div>
          </>
        );
      case 'PART 2: QUESTION- RESPONSE':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">T???i Audio cho c??u h???i:</span>
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
                    <div>T???i audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="T???i t???p l??n"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <div>
              <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
              {[...Array(3)].map((_, index) => {
                return (
                  <div key={`answer-${index}`}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[0].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 1)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'PART 3: CONVERSATIONS':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">T???i ???nh cho c??u h???i:</span>
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
                  <div className="flex gap-1 border rounded-md mt-4 py-1 px-3 w-28 justify-center items-center mb-5">
                    {plusIconBS('text-2xl')}
                    <div>T???i ???nh</div>
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
                <span className="">T???i Audio cho c??u h???i:</span>
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
                    className={`flex gap-1 border rounded-md py-1 px-3 w-28 justify-center items-center cursor-pointer`}>
                    {plusIconBS()}
                    <div>T???i audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="T???i t???p l??n"
                    onChange={onChangeFile}
                    // disabled={disabled}
                  />
                </div>
              </div>
            </div>
            <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 1:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[0].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 1)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 2:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[1].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 2)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 3:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[2].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 3)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'PART 4: SHORT TALKS':
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="...">
                <span className="">T???i Audio cho c??u h???i:</span>
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
                    <div>T???i audio</div>
                  </label>
                  <input
                    className="invisible"
                    id="files"
                    type="file"
                    accept=".mp3"
                    aria-label="T???i t???p l??n"
                    onChange={onChangeFile}
                  />
                </div>
              </div>
            </div>
            <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 1:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[0].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 1)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 2:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={numberCorrectAnswerQuestionTwo === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionTwo(index)}
                      value={questionList[1].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 2)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 3:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionThree === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionThree(index)}
                      value={questionList[2].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 3)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 4:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={Math.random()}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionThree === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionThree(index)}
                      value={questionList[3].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 4)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'PART 5: INCOMPLETE SENTENCES':
        return (
          <>
            <div className="mt-5">
              <span>Nh???p c??u h???i:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
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
                  placeholder="C??u tr??? l???i 1"
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
                  placeholder="C??u tr??? l???i 2"
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
                  placeholder="C??u tr??? l???i 3"
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
              <span>Nh???p ??o???n v??n:</span>
              <div className="mt-5">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="N???i dung"
                  modules={modules}
                  value={groupQuestion.content}
                  onChange={value =>
                    setGroupQuestion({...groupQuestion, content: value})
                  }
                />
              </div>
            </div>
            <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 1:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    handleChangeQuestionName(e, 1)
                  }
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-1-${index}`}>
                    <Answer
                      checked={numberCorrectAnswerQuestionOne === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionOne(index)}
                      value={questionList[0].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 1)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 2:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    handleChangeQuestionName(e, 2)
                  }
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-2-${index}`}>
                    <Answer
                      checked={numberCorrectAnswerQuestionTwo === index && true}
                      onClick={() => setNumberCorrectAnswerQuestionTwo(index)}
                      value={questionList[1].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 2)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 3:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    handleChangeQuestionName(e, 3)
                  }
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-3-${index}`}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionThree === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionThree(index)}
                      value={questionList[2].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 3)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i 4:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    handleChangeQuestionName(e, 4)
                  }
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-4-${index}`}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionFour === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionFour(index)}
                      value={questionList[3].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 4)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'PART 7: SINGLE PASSAGES':
        return (
          <>
            <div className="my-5">
              <span>Nh???p ??o???n v??n:</span>
              <div className="mt-5">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  placeholder="N???i dung"
                  modules={modules}
                  // value={contentPost.content}
                  // onChange={(value) => setContentPost({ ...contentPost, content: value })}
                />
              </div>
            </div>
            <i>T??ch ????? ch???n 1 c??u tr??? l???i ????ng</i>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-4-${index}`}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionFour === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionFour(index)}
                      value={questionList[3].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 4)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-4-${index}`}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionFour === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionFour(index)}
                      value={questionList[3].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 4)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-4-${index}`}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionFour === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionFour(index)}
                      value={questionList[3].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 4)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">
                Nh???p c??u h???i:
              </span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-white-D9D9D9 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-1 rounded-sm w-full"
                  placeholder="Nh???p c??u h???i"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-5">
              {[...Array(4)].map((_, index) => {
                return (
                  <div key={`question-4-${index}`}>
                    <Answer
                      checked={
                        numberCorrectAnswerQuestionFour === index && true
                      }
                      onClick={() => setNumberCorrectAnswerQuestionFour(index)}
                      value={questionList[3].answers[index].content}
                      handlChangeAnswer={(
                        e: ChangeEvent<HTMLInputElement>,
                      ): void => handlChangeAnswer(e, index + 1, 4)}
                      index={index + 1}
                    />
                  </div>
                );
              })}
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="mt-5">
              <span className="text-white-0A1B39 font-normal">T??n ????? thi:</span>
              <div className="flex gap-3 items-center">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block mt-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none border-2 rounded-sm w-full"
                  placeholder="Nh???p t??n ????? thi c???a b???n"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="mt-7">
              <span className="text-white-0A1B39 font-normal">
                M?? t??? b??i thi:
              </span>
              <div className="flex gap-3">
                <textarea
                  className="mt-1 p-2 resize rounded-sm border-2 outline-none w-full h-20"
                  placeholder="Nh??p m?? t??? cho ????? thi c???a b???n"></textarea>
                {exclamationCircleIcon('mt-3 text-blue-2F80ED text-xl')}
              </div>
            </div>
            <div className="gap-4 items-center my-6">
              <span className="">T???i ???nh cho ????? thi:</span>
              <label
                htmlFor="dropzone-file"
                className="justify-center cursor-pointer">
                <div className="mt-2 p-5 w-[104px] border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
                  {plusIconBS('text-2xl')}
                  <div className="text-gray-00000040">T???i ???nh</div>
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
                  Tr???ng th??i ????? thi
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
          <span className="text-xl font-semibold">T???o m???i c??u h???i</span>
        </div>
        <div className="bg-white">
          <div className="py-5 px-6">
            <div className="mb-3">Ch???n lo???i c??u h???i</div>
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
            H???y
          </button>
          <button
            data-modal-toggle="default-modal"
            type="button"
            className="flex gap-2 items-center text-sm px-8 py-2.5 border-2 border-green-00BF6F text-white font-medium leading-tight rounded-r-[2px] hover:bg-green-00BF6F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-green-00BF6F"
            onClick={(): void => handleCreateExam()}>
            T???o c??u h???i
          </button>
        </div>
      </div>
    </div>
  );
};

export default tailwindOnly(QuestionCreate);
