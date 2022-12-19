import {NextPage} from 'next';
import React, {FC, useState} from 'react';
import {chevronDownIcon} from '../public/static/icons';

type PropsType = {
  value: string;
  handlChangeAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  onClick: () => void;
  index: number;
};

const Answer: FC<PropsType> = ({
  value,
  handlChangeAnswer,
  checked,
  onClick,
  index,
}: PropsType) => {
  return (
    <div className="flex gap-3 items-center bg-[#F9F9F9] mt-5 w-5/6 mb-3 p-4">
      <input
        type="radio"
        value="USA"
        className="h-5 w-5 accent-green-600"
        defaultChecked={checked}
        onClick={onClick}
      />
      <input
        id=""
        type="text"
        placeholder={`Câu trả lời ${index}`}
        value={value}
        onChange={handlChangeAnswer}
        className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
      />
    </div>
  );
};

export default Answer;
