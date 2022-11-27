import React, {FC, useEffect, useState} from 'react';
import Dropdown from '../Dropdown';
import {
  exclamationCircleIcon,
  pencilSquareIcon,
  plusIconBS,
  trash3Icon,
} from '../../public/static/icons';
import {QuestionDTO, QuestionType} from '../../models/admin/Question';
import {AnswerBlank, AnswerState} from './AnswerBlank';

export type QuestionCreate = {
  id: string;
  answers: AnswerState[];
  title: string;
  type: QuestionType;
  priority: number;
  isView?: boolean;
};

export type QuestionUpdate = QuestionCreate;

interface Props {
  no: number;
  questionData?: QuestionCreate;
  isView?: boolean;
  setDescription?: (text) => void;
  setTypeQuestion?: (text) => void;
  setAnswer?: (val: AnswerState[]) => void;
  removeQuestion?: (id) => void;
  markEdit?: () => void;
}

const NUMBER_ANSWER = 3;

export const QuestionChoice: FC<Props> = ({
  no,
  questionData,
  isView = false,
  setDescription,
  setTypeQuestion,
  setAnswer,
  removeQuestion,
  markEdit,
}: Props) => {
  const [_isView, setIsView] = useState<boolean>(isView);
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SINGLE_CHOICE,
  );
  const [correctAnswer, setCorrectAnswer] = useState<number[]>([0]);
  const [numberAnswer, setNumberAnswer] = useState<number>(NUMBER_ANSWER);
  const [clickedNotes, setClickedNotes] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerState[]>(
    questionData.answers.length > 0
      ? questionData.answers.map(v => {
          return {
            id: v.id,
            title: v.title,
            isCorrect: v.isCorrect,
            priority: v.priority,
          } as AnswerState;
        })
      : [
          {id: '', title: '', priority: 1, isCorrect: true},
          {id: '', title: '', priority: 2, isCorrect: false},
          {id: '', title: '', priority: 3, isCorrect: false},
        ],
  );

  useEffect(() => {
    if (!_isView) {
      if (
        questionType === QuestionType.SINGLE_CHOICE &&
        correctAnswer.length > 1
      ) {
        setCorrectAnswer([0]);
      }
      setTypeQuestion(questionType);
    }
  }, [questionType]);

  useEffect(() => {
    if (!_isView) {
      setAnswers(prevState => {
        return Array.from(prevState).map((v, i) => {
          return {...v, isCorrect: correctAnswer.includes(i)} as AnswerState;
        });
      });
    }
  }, [correctAnswer]);

  useEffect(() => {
    if (!_isView) {
      setAnswer(answers);
    }
  }, [answers]);

  const genAnswer = [...Array(numberAnswer)].map((_, index) => {
    return (
      <AnswerBlank
        key={'answer_blank_' + index.toString()}
        answer={answers[index]}
        isCorrect={correctAnswer.includes(index)}
        increasingAnswer={(): void => {
          setAnswers(prevState => {
            const newArray = Array.from(prevState);
            newArray.splice(index + 1, 0, {
              id: '',
              title: '',
              priority: newArray.length,
              isCorrect: false,
            });
            return newArray;
          });
          setNumberAnswer(numberAnswer + 1);
        }}
        decreasingAnswer={(): void => {
          setAnswers(prevState => {
            const newArray = Array.from(prevState);
            newArray.splice(index, 1);
            return newArray;
          });
          setNumberAnswer(numberAnswer - 1);
        }}
        setAnswerContent={(e): void => {
          const val = e.target.value;
          setAnswers(prevState => {
            const newArray = Array.from(prevState);
            newArray[index].title = val;
            return newArray;
          });
        }}
        setAnswerChecked={(): void => {
          if (questionType === QuestionType.SINGLE_CHOICE) {
            setCorrectAnswer([index]);
          } else {
            // check isChecked
            if (correctAnswer.includes(index)) {
              // remove here
              if (correctAnswer.length > 1) {
                setCorrectAnswer(prevState => {
                  const newArray = Array.from(prevState);
                  newArray.splice(prevState.indexOf(index), 1);
                  return newArray;
                });
              }
            } else {
              // not checked
              setCorrectAnswer(prevState => {
                const newArray = Array.from(prevState);
                newArray.push(index);
                return newArray;
              });
            }
          }
        }}
      />
    );
  });

  return _isView ? (
    <div className="border-2 rounded-md border-gray-E5E6EC w-3/5 p-4">
      <div className="flex items-center">
        <div className="flex flex-auto gap-3">
          <div className="">
            <span className="font-bold">Question {no}</span>:
            <span className="ml-3">{questionData?.title}</span>
          </div>
          {exclamationCircleIcon('text-blue-2F80ED text-xl')}
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2 items-center h-full btn px-3 py-1 text-white font-medium text-xs leading-tight rounded-sm hover:bg-blue-40A9FF focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-40A9FF">
            {pencilSquareIcon()}
            <button
              className="flex gap-2"
              type="button"
              onClick={() => {
                setIsView(false);
                markEdit();
              }}>
              <span className="text-base">Sửa</span>
            </button>
          </div>
          <div className="flex gap-2 items-center h-full btn px-3 py-1 border border-red-FF4D4F text-white font-medium text-xs leading-tight rounded-sm hover:bg-red-FF4D4F focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-red-FF7875">
            {trash3Icon()}
            <button
              className="flex gap-2"
              type="button"
              onClick={(): void => {
                removeQuestion(questionData.id);
              }}>
              <span className="text-base">Xóa</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="">
          <img src="#" alt="img" />
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
          {questionData?.answers.map((v, i) => {
            return (
              <div
                key={`question_data_answer_${i}`}
                className="flex gap-2 items-center mb-5">
                <input
                  type="radio"
                  className="h-5 w-5 opacity-30 focus:ring-green-00BF6F"
                />
                <span className="font-bold">A</span>
                <span className="ml-2">{v.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="py-4 font-medium">Question {no}</div>
      <div className="flex">
        <textarea
          className="resize rounded-sm border border-white-D9D9D9 outline-none w-3/5 h-20 px-3 pt-2 text-sm"
          placeholder="Nhập đoạn văn của bạn"
          onChange={event => setDescription(event.currentTarget.value)}
          value={questionData?.title}
        />
        <Dropdown
          dropdownList={Object.keys(QuestionType).map(k => QuestionType[k])}
          selectedOption={questionType}
          setSelectedOption={setQuestionType}
        />
        <div className="flex ml-4 items-center">
          {exclamationCircleIcon('text-blue-2F80ED text-xl')}
        </div>
      </div>
      <div className="mt-8 flex w-1/2">
        <div className="flex-auto">
          <span className="flex">Ảnh Collection:</span>
          {/* <div className="mt-2 p-5 w-[104px] border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
                  {plusIconBS('text-2xl')}
                  <div className="text-gray-00000040">Upload</div>
                </div> */}
          <label
            htmlFor="dropzone-file"
            className=" justify-center cursor-pointer">
            <div className="mt-2 p-5 w-[104px] border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
              {plusIconBS('text-2xl')}
              <div className="text-gray-00000040">Upload</div>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div>
          <span className="flex">Tải Audio cho câu hỏi:</span>
          <div className="mt-2 p-5 w-[104px] border border-dashed border-blue-1890FF rounded-sm text-center hover:cursor-pointer">
            {plusIconBS('text-2xl')}
            <div className="text-gray-00000040">Upload</div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="flex">Tích để chọn câu hỏi đúng.</span>
        <div className="mt-2 w-3/5">{genAnswer}</div>
      </div>
      <div className="flex gap-3 mt-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="bg-gray-50 border-gray-300 focus:ring-blue-300 h-4 w-4 rounded"
            onClick={(): void => setClickedNotes(!clickedNotes)}
          />
        </div>
        <div className="text-sm">
          <label className="font-normal">Thêm ghi chú trợ giúp cho câu</label>
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
