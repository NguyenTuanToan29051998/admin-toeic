import React, {FC} from 'react';
import {dashCircleIcon, plusCircleIcon} from '../../public/static/icons';

export type AnswerState = {
  id: string;
  title: string;
  priority: number;
  isCorrect: boolean;
};

interface Props {
  answer: AnswerState;
  isCorrect: boolean;
  increasingAnswer: () => void;
  decreasingAnswer: () => void;
  setAnswerChecked: () => void;
  setAnswerContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AnswerBlank: FC<Props> = ({
  increasingAnswer,
  decreasingAnswer,
  setAnswerChecked,
  setAnswerContent,
  answer,
  isCorrect,
}: Props) => {
  return (
    <div className="flex gap-3 items-center py-3 px-4 mb-4 bg-white-F9f9f9">
      <svg
        onClick={setAnswerChecked}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={isCorrect ? 'green' : 'currentColor'}
        className={`bi bi-check-circle text-2xl opacity-50 hover:cursor-pointer`}
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
      </svg>
      <input
        value={answer.title}
        onChange={e => {
          e.preventDefault();
          setAnswerContent(e);
        }}
        className="border w-full pl-2 font-normal text-sm focus:outline-none py-2 bg-white"
        type="text"
        placeholder="Nhập câu trả lời"
      />
      {dashCircleIcon(
        'text-lg text-gray-828282 hover:cursor-pointer',
        decreasingAnswer,
      )}
      {plusCircleIcon(
        'text-lg text-gray-828282 hover:cursor-pointer',
        increasingAnswer,
      )}
    </div>
  );
};
