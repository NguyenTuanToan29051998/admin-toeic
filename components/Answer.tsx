import {NextPage} from 'next';
import React, {FC, useState} from 'react';
import {chevronDownIcon} from '../public/static/icons';

type PropsType = {
  value: string;
  handlChangeAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  onClick: () => void;
};

const Answer: FC<PropsType> = ({
  value,
  handlChangeAnswer,
  checked,
  onClick,
}: PropsType) => {
  return (
    <div className="flex gap-3 items-center bg-[#F9F9F9] mt-5 w-5/6 mb-3 p-4">
      <input
        id="country-option-1"
        type="radio"
        name="countries"
        value="USA"
        className="h-5 w-5 accent-green-600"
        aria-labelledby="country-option-1"
        aria-describedby="country-option-1"
        defaultChecked={checked}
        onClick={onClick}
      />
      <input
        id=""
        type="text"
        // name="countries"
        placeholder="Câu trả lời 1"
        value={value}
        onChange={handlChangeAnswer}
        className="h-8 w-full border rounded-sm border-[#D9D9D9] outline-none p-2 bg-white"
      />
    </div>
  );
};

export default Answer;
