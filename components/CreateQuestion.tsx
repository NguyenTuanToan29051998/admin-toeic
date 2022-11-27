import React, {useEffect, useState} from 'react';
import {Dispatch, FC, SetStateAction} from 'react';
import Dropdown from './Dropdown';
import {
  check2SquareIcon,
  checkCircleIcon,
  dashCircleIcon,
  exclamationCircleIcon,
  plusCircleIcon,
} from '../public/static/icons';

interface Props {
  onClick?: () => void;
}

interface Answer {
  id: number;
  content: string;
}
[];

const CreateQuestion: FC<Props> = ({onClick}: Props) => {
  const [numberAnswer, setNumberAnswer] = useState<number>(3);
  const [isCreateAnswer, setIsCreateAnswer] = useState<boolean>(false);
  const [clickedNotes, setClickedNotes] = useState<boolean>(false);
  const [subQuestionType, setSubQuestionType] = useState<string>(
    'Single Choise',
  );
  const [answerList, setAnswerList] = useState<Answer[]>([
    {id: 0, content: ''},
    {id: 1, content: ''},
  ]);
  let tatalAnswer = answerList.length;
  const questionTypeList = ['Single Choise', 'Multiple Choise'];

  const handleAddAnswer = (): void => {
    tatalAnswer = tatalAnswer + 1;
    // const answer: Answer = {id: 3, content: ''};
    setAnswerList([...answerList, {id: tatalAnswer, content: ''}]);
  };

  useEffect(() => {
    setAnswerList([
      {id: 0, content: ''},
      {id: 1, content: ''},
    ]);
  }, [subQuestionType]);

  return (
    <div className="border-1 rounded-md border-gray-E5E6EC w-2/3 mt-4 p-4">
      <div className="py-4 font-medium">Question 1</div>
      <div className="flex mr-4">
        <input
          className="border-y-1 border-l-1 focus:outline-none w-full pl-3 rounded-tl-sm rounded-bl-sm border-white-D9D9D9 text-sm"
          type="text"
          placeholder="Nhập câu hỏi của bạn"
        />
        <Dropdown
          dropdownList={questionTypeList}
          selectedOption={subQuestionType}
          setSelectedOption={setSubQuestionType}
        />
        <div className="flex ml-4 items-center">
          {exclamationCircleIcon('text-blue-2F80ED text-xl')}
        </div>
      </div>
      <div className="mt-4">
        <span className="flex">Tích để chọn câu hỏi đúng.</span>
        <div className="mt-2 w-[90%]">
          {answerList.map((item, index) => (
            <div
              className="flex gap-3 items-center py-3 px-4 mb-4 bg-white-F9f9f9"
              key={Math.random()}>
              {subQuestionType === 'Single Choise'
                ? checkCircleIcon('text-2xl opacity-20 hover:cursor-pointer')
                : check2SquareIcon(
                    'text-2xl text-green-00BF6F hover:cursor-pointer',
                  )}
              {/* <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="bg-gray-50 border-gray-300 h-6 w-6 rounded opacity-20 accent-gray-300"
                    checked
                    // onClick={(): void => setClickedNotes(!clickedNotes)}
                  /> */}
              <input
                className="border w-full pl-2 font-normal text-sm focus:outline-none py-2 bg-white"
                type="text"
                placeholder="Nhập câu trả lời"
              />
              {dashCircleIcon(
                'text-lg text-gray-828282 hover:cursor-pointer',
                () => {
                  console.log(item.id, 'id');
                },
              )}
              {plusCircleIcon(
                'text-lg text-gray-828282 hover:cursor-pointer',
                handleAddAnswer,
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <div className="flex items-center h-5">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            className="bg-gray-50 border-gray-300 focus:ring-blue-300 h-4 w-4 rounded"
            onClick={(): void => setClickedNotes(!clickedNotes)}
          />
        </div>
        <div className="text-sm">
          <label htmlFor="remember" className="font-normal">
            Thêm ghi chú trợ giúp cho câu
          </label>
        </div>
      </div>
      {clickedNotes && (
        <div className="flex gap-2 items-center py-3 px-4 my-4 bg-white-F9f9f9 w-3/5">
          <div className="inline-flex">
            <a
              className="group max-w-max relative mx-1 flex flex-col items-center justify-center rounded-full text-gray-500"
              href="#">
              {exclamationCircleIcon('text-blue-2F80ED text-xl')}
              {/* <div className="absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex flex-col items-center mb-1">
              <div className="rounded bg-gray-900 p-2 text-sm shadow-lg w-72 h-20 leading-5">
                Bạn có thể lựa chọn các collections có sẵn hoặc một
                collection bằng cách gõ trực tiếp vào dropdown list.
              </div>
              <div className="border border-x-8 border-solid border-x-transparent border-t-8 border-t-black"></div>
            </div>
          </div> */}
            </a>
          </div>
          <input
            className="border pl-2 font-normal text-sm focus:outline-none py-2 bg-white w-[89%]"
            type="text"
            placeholder="Nhập câu trả lời"
          />
        </div>
      )}
    </div>
  );
};

export default CreateQuestion;
