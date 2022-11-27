import React, {useState} from 'react';
import {Dispatch, FC, SetStateAction} from 'react';
import {chevronDownIcon} from '../public/static/icons';

interface Props {
  data: {
    display: string;
    values: string | number;
  }[];
  onClick?: () => void;
  selectedOption: {
    display: string;
    values: string | number;
  };
  setSelectedOption: (option: {
    display: string;
    values: string | number;
  }) => void;
}

const DropdownValue: FC<Props> = ({
  data,
  selectedOption,
  setSelectedOption,
}: Props) => {
  // const [selectedOption, setSelectedOption] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleChoose = (option: {
    display: string;
    values: string | number;
  }): void => {
    setSelectedOption(option);
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-5">
        <div className="relative">
          <div
            className="flex items-center border border-white-D9D9D9 focus:border-primary-200 rounded-tr-sm rounded-br-sm"
            onClick={(): void => setShowDropdown(!showDropdown)}>
            <input
              className="bg-white focus:outline-none font-normal rounded-sm text-sm px-4 py-2.5 inline-flex cursor-pointer"
              value={selectedOption.display}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              //   setSelectedOption(e.target.value)
              // }
              disabled
            />
            {chevronDownIcon('px-4 hover:cursor-pointer')}
          </div>
          {showDropdown && (
            <div className="absolute w-full border-x-1 border-b bg-white text-sm z-10">
              {data.map(item => (
                <div
                  key={`ddv_${item.values}`}
                  className="pl-4 py-2 hover:bg-green-00BF6F"
                  onClick={(e): void => {
                    e.preventDefault();
                    handleChoose(item);
                  }}>
                  {item.display}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownValue;
